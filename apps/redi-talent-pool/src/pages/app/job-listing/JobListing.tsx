import { useParams } from 'react-router-dom'
import { LoggedIn } from '../../../components/templates'
import { useTpJobListingOneQuery } from '../../../react-query/use-tpjoblisting-one-query'

export function JobListing() {
  const { tpJobListingId }: { tpJobListingId: string } = useParams()
  const { data: jobListing } = useTpJobListingOneQuery(tpJobListingId)

  console.log(jobListing)

  return <LoggedIn>yo bitch</LoggedIn>
}

export default JobListing
