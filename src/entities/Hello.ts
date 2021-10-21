import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity } from 'typeorm'

@ObjectType()
@Entity()
export class Hello extends BaseEntity {
  @Field()
  @Column()
  zaber: string
}
