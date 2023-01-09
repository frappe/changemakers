import { Session } from "@/data/session"
import { UserResource } from "@/data/user"
import type { InjectionKey } from "vue"
import { Dayjs, ConfigType } from "dayjs"

type dayjs = (date?: ConfigType) => Dayjs

export const sessionInjectionKey = Symbol() as InjectionKey<Session>
export const userResourceInjectionKey = Symbol() as InjectionKey<UserResource>
export const dayjsInjectionKey = Symbol() as InjectionKey<dayjs>
