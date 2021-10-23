import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType() // for graphql class
@Entity()
export class Hr_Assignee extends BaseEntity {
  @Field(() => Int) // for graphql type
  @PrimaryGeneratedColumn() // for db type
  id: number

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  password: string

  @Field(() => String)
  @CreateDateColumn()
  birth_date: Date

  @Field(() => Int)
  @Column('int', { nullable: true })
  requirement_level: number

  @Field(() => Int)
  @Column('int', { default: 1 })
  type: number

  @Field(() => String)
  @Column()
  mail: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
