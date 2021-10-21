import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Hello extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  zaber: number 

  @Field()
  @Column({ type: 'decimal', nullable: true })
  length: number
}
