import { Resolver } from 'type-graphql'
import { Hello } from '../entities/Hello'

@Resolver(Hello)
export class HelloResolver {}
