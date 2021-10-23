import { Hr_Assignee } from 'src/entities/Hr_Assignee'
import { ObjectType, Field, InputType, Int } from 'type-graphql'

@ObjectType()
export class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
export class Hr_Assignee_Response {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Hr_Assignee, { nullable: true })
  hr_assignee?: Hr_Assignee
}

@InputType()
export class Hr_Assignee_Input {
  @Field()
  name: string

  @Field()
  password: string

  @Field(() => String)
  birth_date: Date

  @Field(() => Int, { defaultValue: 0 })
  requirement_level?: number

  @Field(() => Int, { defaultValue: 1 })
  type?: number

  @Field(() => String)
  mail?: string
}

@InputType()
export class Hr_Assignee_Update_Input {
  @Field()
  name?: string

  @Field(() => String)
  birth_date?: Date

  @Field(() => Int, { defaultValue: 0 })
  requirement_level?: number

  @Field(() => Int, { defaultValue: 1 })
  type?: number

  @Field(() => String)
  mail?: string
}
