import { Session } from "@/data/session"
import { UserResource } from "@/data/user"
import type { InjectionKey } from "vue"

export const sessionInjectionKey = Symbol() as InjectionKey<Session>
export const userResourceInjectionKey = Symbol() as InjectionKey<UserResource>
