import { Arg, Mutation, Resolver, Int, Query, InputType, Field } from "type-graphql";
import { hr_assignees } from '../entities/hr_assignees';
import argon2 from 'argon2';

@InputType()
class hr_assignees_input {
    @Field()
    name: string;

    @Field()
    password: string;

    @Field(() => String)
    birth_date: Date;

    @Field(() => Int, { defaultValue: 0 })
    requirement_level?: number;

    @Field(() => Int, { defaultValue: 1 })
    type?: number;

    @Field(() => String)
    mail?: string;
}
@InputType()
class hr_assignees_update_input {
    @Field()
    name?: string;

    @Field(() => String)
    birth_date?: Date;

    @Field(() => Int, { defaultValue: 0 })
    requirement_level?: number;

    @Field(() => Int, { defaultValue: 1 })
    type?: number;

    @Field(() => String)
    mail?: string;    
}

@Resolver()
export class hr_assignees_resolver {

    // crud: create
    @Mutation(() => hr_assignees)
    async createHrAssignees(
        @Arg('input', () => hr_assignees_input) input: hr_assignees_input
    ): Promise<hr_assignees> {
        const hashedPassword = await argon2.hash(input.password)        // .verify unenc
        input.password = hashedPassword;

        const hr_person = await hr_assignees.create(input).save();     // insert and select
        return hr_person;
    }

    // crud: read
    @Query(() => [hr_assignees])
    hrAssignees() {
        return hr_assignees.find();
    }

    // crud: update
    @Mutation(() => Boolean)
    async updateHrAssignees(
        @Arg('id', ()=>Int) id: number,
        @Arg('input', () => hr_assignees_update_input) input: hr_assignees_update_input
    ) {
        await hr_assignees.update({id}, input);    // search by id and update but input
        return true;
    }

    // crud: delete
    @Mutation(() => Boolean)
    async deleteHrAssignees(
        @Arg('id', ()=>Int) id: number
    ) {
        await hr_assignees.delete({ id });
        return true;
    }

}