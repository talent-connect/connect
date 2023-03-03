import { UserContactEntityProps } from '@talent-connect/common-types'

export interface CurrentUserInfo {
  loopbackUserId: string
  userId: string
  userProps: UserContactEntityProps
}
