import { Injectable } from '@nestjs/common'
import { TpCompanyProfileSignUpMutationInputDto } from '@talent-connect/common-types'
import { CurrentUserInfo } from '../../auth/current-user.interface'
import { SfApiTpCompanyProfilesService } from '../../salesforce-api/sf-api-tp-company-profiles.service'

@Injectable()
export class TpCompanyProfileSignUpUseCase {
  constructor(private readonly sfService: SfApiTpCompanyProfilesService) {}

  // TODO: use a mapper here for more elegnat conversion
  async execute(
    input: TpCompanyProfileSignUpMutationInputDto,
    currentUser: CurrentUserInfo
  ) {}
}
