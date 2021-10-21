import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { Hello } from '../entities/Hello'

@ObjectType()
class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class HelloResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Hello, { nullable: true })
  hello?: Hello
}

@Resolver(Hello)
export class HelloResolver {
  @Query(() => Hello)
  me(@Arg('zaber') zaber: number) {
    return Hello.find({ zaber })
  }

  @Mutation(() => HelloResponse)
  async createZaber(@Arg('length') length: number): Promise<HelloResponse> {
    let hello = await Hello.create({ length }).save()
    return {
      errors: [],
      hello,
    }
  }
}
