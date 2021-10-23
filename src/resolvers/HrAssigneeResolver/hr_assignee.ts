import argon2 from 'argon2'
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from 'src/constants'
import { MyContext } from 'src/types'
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { Hr_Assignee } from '../../entities/Hr_Assignee'
import {
  Hr_Assignee_Input,
  Hr_Assignee_Response,
  Hr_Assignee_Update_Input,
} from './types'
import { validateHrAssignee } from './validation'

@Resolver()
export class hr_assignee_resolver {
  // crud: create
  @Mutation(() => Hr_Assignee)
  async createHrAssignees(
    @Arg('input', () => Hr_Assignee_Input) input: Hr_Assignee_Input,
    @Ctx() { req }: MyContext
  ): Promise<Hr_Assignee_Response> {
    const errors = validateHrAssignee(input)
    if (errors) {
      return { errors }
    }

    const hashedPassword = await argon2.hash(input.password) // .verify unenc
    input.password = hashedPassword

    const hr_assignee = await Hr_Assignee.create(input).save() // insert and select

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.hr_assignee_Id = hr_assignee.id

    return {
      hr_assignee,
    }
  }

  // crud: read
  @Query(() => [Hr_Assignee])
  hrAssignees() {
    return Hr_Assignee.find()
  }

  @Query(() => Hr_Assignee)
  hrAssignee(@Arg('id') id: string, @Ctx() { req }: MyContext) {
    if (!req.session.hr_assignee_Id) {
      return null
    }
    return Hr_Assignee.findOne(id)
  }

  // crud: update
  @Mutation(() => Boolean)
  async updateHrAssignee(
    @Arg('id', () => Int) id: number,
    @Arg('input', () => Hr_Assignee_Update_Input)
    input: Hr_Assignee_Update_Input
  ) {
    await Hr_Assignee.update({ id }, input) // search by id and update but input
    return true
  }

  // crud: delete
  @Mutation(() => Boolean)
  async deleteHrAssignees(@Arg('id', () => Int) id: number) {
    await Hr_Assignee.delete({ id })
    return true
  }

  @FieldResolver(() => String)
  email(@Root() hr_assignee: Hr_Assignee, @Ctx() { req }: MyContext) {
    // this is the current user and its ok to show them their own email
    if (req.session.hr_assignee_Id === hr_assignee.id) {
      return hr_assignee.mail
    }
    // current user wants to see someone elses email
    return ''
  }

  @Mutation(() => Hr_Assignee_Response)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<Hr_Assignee_Response> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'length must be greater than 2',
          },
        ],
      }
    }

    const key = FORGET_PASSWORD_PREFIX + token
    const hr_assignee_id = await redis.get(key)
    if (!hr_assignee_id) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          },
        ],
      }
    }

    const hr_assignee_id_num = parseInt(hr_assignee_id)
    const hr_assignee = await Hr_Assignee.findOne(hr_assignee_id_num)

    if (!hr_assignee) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exists',
          },
        ],
      }
    }

    await Hr_Assignee.update(
      { id: hr_assignee_id_num },
      {
        password: await argon2.hash(newPassword),
      }
    )

    await redis.del(key)

    // log in user after change password
    req.session.hr_assignee_Id = hr_assignee.id

    return { hr_assignee }
  }

  @Mutation(() => Hr_Assignee_Response)
  async login(
    @Arg('Email') Email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<Hr_Assignee_Response> {
    const hr_assignee = await Hr_Assignee.findOne({ mail: Email })
    if (!hr_assignee) {
      return {
        errors: [
          {
            field: 'Email',
            message: "Email doesn't exist",
          },
        ],
      }
    }
    const valid = await argon2.verify(hr_assignee.password, password)
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      }
    }

    req.session.hr_assignee_Id = hr_assignee.id
    console.log('req user id', req.session.hr_assignee_Id)

    return {
      hr_assignee,
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME)
        if (err) {
          console.log(err)
          resolve(false)
          return
        }

        resolve(true)
      })
    )
  }
}
