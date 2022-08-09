import { UserEntityProps } from '@talent-connect/common-types'

export interface CurrentUserInfo {
  loopbackUserId: string
  userId: string
  userProps: UserEntityProps
}
