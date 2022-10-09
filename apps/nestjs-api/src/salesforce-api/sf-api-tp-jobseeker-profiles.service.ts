import { Injectable } from '@nestjs/common'
import { TpJobseekerProfileRecord } from '@talent-connect/common-types'
import { isBoolean, isObject, isString } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpJobseekerProfilesService {
  constructor(private readonly repository: SfApiRepository) {}

  async findAllJobseekerProfiles(filter: any = {}) {
    const jobseekerProfilesFilterCount =
      Object.keys(filter?.['Jobseeker_Profiles__r'] ?? {}).length ?? 0
    let subQueryClause = ''
    if (jobseekerProfilesFilterCount > 0) {
      subQueryClause =
        'WHERE ' +
        buildJobseekerProfileSubQueryWhereClause(
          filter?.['Jobseeker_Profiles__r']
        )
    }
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: TpJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      childObjects: TpJobseekerProfileRecord.metadata.SALESFORCE_CHILD_OBJECTS,
      rawWhereClause: `Id IN (SELECT Contact__c FROM Jobseeker_Profile__c ${subQueryClause})`,
      filter,
    })
    const jobseekerProfileRecords = rawRecords.map((rawRecord) =>
      TpJobseekerProfileRecord.create(rawRecord)
    )
    return jobseekerProfileRecords
  }
}

function buildJobseekerProfileSubQueryWhereClause(jobseekerProfileFilters: {
  [key: string]: string
}) {
  const conditions = []
  // if (Object.entries(jobseekerProfileFilters).length > 0) whereClause +- 'WHERE '
  for (const [key, value] of Object.entries(jobseekerProfileFilters)) {
    if (isString(value)) {
      conditions.push(`${key} = '${escapeSOQLString(value)}'`)
    } else if (isBoolean(value)) {
      conditions.push(`${key} = ${value}`)
    } else if (isObject(value)) {
      if (value['$like']) {
        conditions.push(`${key} LIKE '%${escapeSOQLString(value['$like'])}%'`)
      } else if (value['$in']) {
        const list = (value['$in'] as string[]).map(
          (item) => `'${escapeSOQLString(item)}'`
        )
        conditions.push(`${key} IN (${list.join(', ')})`)
      } else if (value['$includes']) {
        const list = (value['$includes'] as string[]).map(
          (item) => `'${escapeSOQLString(item)}'`
        )
        conditions.push(`${key} INCLUDES (${list.join(', ')})`)
      }
    }
  }

  return conditions.join(' AND ')
}

function escapeSOQLString(str: string) {
  return String(str || '').replace(/'/g, "\\'")
}
