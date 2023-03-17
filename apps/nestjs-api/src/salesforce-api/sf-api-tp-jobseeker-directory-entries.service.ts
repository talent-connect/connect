import { Injectable } from '@nestjs/common'
import { TpJobseekerDirectoryEntryRecord } from '@talent-connect/common-types'
import { isBoolean, isObject, isString } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpJobseekerDirectoryEntriesService {
  constructor(private readonly repository: SfApiRepository) {}

  async findAllJobseekerDirectoryEntries(filter: any = {}) {
    const jobseekerDirectoryEntrysFilterCount =
      Object.keys(filter?.['Jobseeker_Profiles__r'] ?? {}).length ?? 0
    let subQueryClause = ''
    if (jobseekerDirectoryEntrysFilterCount > 0) {
      subQueryClause =
        'WHERE ' +
        buildJobseekerDirectoryEntrySubQueryWhereClause(
          filter?.['Jobseeker_Profiles__r']
        )
    }
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName:
        TpJobseekerDirectoryEntryRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields:
        TpJobseekerDirectoryEntryRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      childObjects:
        TpJobseekerDirectoryEntryRecord.metadata.SALESFORCE_CHILD_OBJECTS,
      orderBy: TpJobseekerDirectoryEntryRecord.metadata.SALESFORCE_ORDER_BY,
      rawWhereClause: `Id IN (SELECT Contact__c FROM Jobseeker_Profile__c ${subQueryClause})`,
      filter,
    })
    const jobseekerDirectoryEntryRecords = rawRecords.map((rawRecord) =>
      TpJobseekerDirectoryEntryRecord.create(rawRecord)
    )
    return jobseekerDirectoryEntryRecords
  }

  async updateTpJobseekerDirectoryEntry(
    record: TpJobseekerDirectoryEntryRecord
  ) {
    const tpJobseekerDirectoryEntryProps = record.props
    const contactProps = record.props

    // const updateResult = await this.repository.updateRecord(
    //   TpJobseekerDirectoryEntryRecord.metadata.SALESFORCE_OBJECT_NAME,
    //   record.Id,
    //   record
    // )
    // return updateResult
  }
}

function buildJobseekerDirectoryEntrySubQueryWhereClause(jobseekerDirectoryEntryFilters: {
  [key: string]: string
}) {
  const conditions = []
  // if (Object.entries(jobseekerDirectoryEntryFilters).length > 0) whereClause +- 'WHERE '
  for (const [key, value] of Object.entries(jobseekerDirectoryEntryFilters)) {
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
