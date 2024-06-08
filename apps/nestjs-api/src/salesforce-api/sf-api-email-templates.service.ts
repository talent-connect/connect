import { Injectable } from '@nestjs/common'
import { SfApiRepository } from './sf-api.repository'

type EmailTemplate = {
  Id: string
  Name: string
  Subject: string
  HtmlValue: string
  Body: string
  IsActive: boolean
}

@Injectable()
export class SfApiEmailTemplatesService {
  constructor(private readonly repository: SfApiRepository) {}

  async getEmailTemplate(
    templateDeveloperName: string
  ): Promise<EmailTemplate> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: 'EmailTemplate',
      objectFields: ['Subject', 'HtmlValue'],
      filter: { DeveloperName: templateDeveloperName },
    })

    // Return the first record found, expecting only one record
    return rawRecords[0]
  }
}
