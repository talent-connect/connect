import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { SfConProfile } from '../salesforce-api/objects/sf-con-profile.sfobject'
import { SalesforceApiService } from '../salesforce-api/salesforce-api.service'
import { ConProfile } from './entities/con-profile.entity'

/*
The repository should be Salesforce API repistory
We should be returning an interface, not a class

The repo should only be doing reading and writing. We should
interact with repo using objects for reading and writing.
*/

@Injectable()
export class ConProfilesRepository {
  constructor(private readonly salesforceApi: SalesforceApiService) {}

  async findAll() {
    // TODO: We should pass in simply `SfConProfile` (the class) instead of an instance thereof
    // I (Eric) tried for a couple of days to get this to work, without success.
    const rawResults = await this.salesforceApi.allRecordsOfObject(
      new SfConProfile()
    )
    const results: SfConProfile[] = rawResults.map((json) =>
      plainToClass(
        SfConProfile,
        json
        // TODO: enable this and fix errors that surface
        // { excludeExtraneousValues: true }
      )
    )

    console.log(results)

    const domainObjects: ConProfile[] = results.map((sfConProfile) =>
      sfConProfile.toDomain()
    )

    console.log(domainObjects)

    return domainObjects
  }
}
