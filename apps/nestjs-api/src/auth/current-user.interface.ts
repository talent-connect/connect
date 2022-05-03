import { ContactEntityProps } from '@talent-connect/common-types'

export interface CurrentUserInfo {
  loopbackUserId: string
  contactId: string
  contactProps: ContactEntityProps
}
