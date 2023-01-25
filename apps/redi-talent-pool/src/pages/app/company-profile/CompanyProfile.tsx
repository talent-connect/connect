import { useHistory, useParams } from "react-router-dom";
import { Columns } from 'react-bulma-components'
import { useTpCompanyProfileByIdQuery } from "apps/redi-talent-pool/src/react-query/use-tpcompanyprofile-query";
import { LoggedIn } from "apps/redi-talent-pool/src/components/templates";
import { EditableNamePhotoLocation } from "apps/redi-talent-pool/src/components/organisms/company-profile-editables/EditableNamePhotoLocation";
import { EditableAbout } from "apps/redi-talent-pool/src/components/organisms/company-profile-editables/EditableAbout";
import { EditableDetails } from "apps/redi-talent-pool/src/components/organisms/company-profile-editables/EditableDetails";
import { EditableContact } from "apps/redi-talent-pool/src/components/organisms/company-profile-editables/EditableContact";
import { EditableJobPostings } from '../../../components/organisms/company-profile-editables/EditableJobPostings'
import { stubFalse } from "lodash";
import { useTpJobListingAllOfOneUserQuery } from "apps/redi-talent-pool/src/react-query/use-tpjoblisting-all-query";
import JobListing from "../job-listing/JobListing";
import { JobListingCard } from '../../../components/organisms/JobListingCard';

// const history = useHistory()

interface CompanyProfileParams {
    tpCompanyProfileId: string
}

export function CompanyProfile() {
    const { tpCompanyProfileId } = useParams<CompanyProfileParams>()
    const { data: companyProfile } = useTpCompanyProfileByIdQuery(tpCompanyProfileId)
    // const { data: jobListings } = useTpJobListingAllOfOneUserQuery(tpCompanyProfileId)

    return (
        <LoggedIn>
            <Columns className="is-6 is-variable">
                <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'three-fifths '}}>
                    <EditableNamePhotoLocation profile={companyProfile} disableEditing />
                    <EditableAbout profile={companyProfile} disableEditing />
                </Columns.Column>
                <Columns.Column>
                    <EditableDetails profile={companyProfile} disableEditing />
                    <EditableContact profile={companyProfile} disableEditing />
                </Columns.Column>
            </Columns>
            <Columns>
                {/* {jobListings?.map((jobListing) => (
                    <Columns.Column mobile={{ size: 12 }} tablet={{ size: 6 }}>
                        <JobListingCard
                            key={jobListing.id}
                            jobListing={jobListing}
                            onCardClick={() =>
                                history.push(`/app/job-listing/${jobListing.id}`)
                            }
                        />
                    </Columns.Column>
                ))} */}
            </Columns>
        </LoggedIn>
    )
}

export default CompanyProfile