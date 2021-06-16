import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  usePDF,
  View,
} from '@react-pdf/renderer'
import { isEqual } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import {
  Document as ReactPDFDocument,
  Page as ReactPDFPage,
  pdfjs,
} from 'react-pdf/dist/esm/entry.webpack'
import { screen } from '@testing-library/react'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

Font.register({
  family: 'Avenir LT Std',
  fonts: [
    {
      src: '/assets/fonts/Avenir-Black.woff',
      fontWeight: 900,
      fontSize: 'normal',
    },
    {
      src: '/assets/fonts/Avenir-Heavy.woff',
      fontWeight: 800,
      fontSize: 'normal',
    },
    {
      src: '/assets/fonts/Avenir-Medium.woff',
      fontWeight: 500,
      fontSize: 'normal',
    },
    {
      src: '/assets/fonts/Avenir-MediumOblique.woff',
      fontWeight: 500,
      fontSize: 'oblique',
    },
    {
      src: '/assets/fonts/AvenirLTStd-Book.woff',
      fontWeight: 300,
      fontSize: 'normal',
    },
  ],
})

export interface UserCVData {
  position: string
  firstName: string
  lastName: string
  profileImage: string
}
interface CVPDFPreviewProps {
  cvData: UserCVData
}

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Avenir LT Std',
    flexDirection: 'column',
    border: 'solid 1px yellow',
    height: '100%',
  },
  header: {
    color: '#fff',
    height: '200px',
    backgroundColor: '#09375A',
    position: 'relative',
  },
  headerText1: {
    top: '50px',
    left: '237px',
    position: 'absolute',
    fontSize: '14px',
    marginBottom: '25px',
    letterSpacing: '0.63px',
  },
  headerText2: {
    top: '70px',
    left: '235px',
    position: 'absolute',
    fontSize: '40px',
    fontWeight: 900,
    textTransform: 'uppercase',
  },
  headerText3: {
    top: '110px',
    left: '235px',
    position: 'absolute',
    fontSize: '40px',
    fontWeight: 900,
    textTransform: 'uppercase',
  },
  headerImg: {
    top: '45px',
    left: '34.5px',
    position: 'absolute',
    width: '170px',
    height: '250px',
  },
  content: {
    flexDirection: 'row',
  },
  contentLeft: {
    flexDirection: 'column',
    width: '40%',
    marginTop: '115px',
  },
  contentRight: {
    flexDirection: 'column',
    width: '60%',
  },
  contentViewLeft: {
    margin: '10px 29px 0 36px',
    padding: '5px 0',
    borderTop: '1px solid #707070',
  },
  contentViewRight: {
    margin: '15px 36px 0 -2px',
    padding: '5px 0',
    borderTop: '1px solid #707070',
  },
  contentHeading: {
    fontSize: '16px',
    fontWeight: 900,
    lineHeight: '1.1',
    letterSpacing: '0.63px',
    textTransform: 'uppercase',
  },
  contentDummyHeading: {
    fontSize: '16px',
    fontWeight: 900,
    lineHeight: '1.1',
    letterSpacing: '0.63px',
    color: 'white',
  },
  contentSubHeading: {
    fontSize: '12px',
    fontWeight: 900,
    paddingTop: '12px',
    lineHeight: '0.8',
    letterSpacing: '0.47px',
  },
  ContentList: {
    fontSize: '10px',
    paddingTop: '5px',
    lineHeight: '1px',
  },
  ContentListItem: {
    fontSize: '10px',
    paddingVertical: '5px',
    lineHeight: '0.54',
    letterSpacing: '0.41px',
  },
  contentPara: {
    fontSize: '10px',
    paddingTop: '10px',
    lineHeight: '1.31',
    letterSpacing: '0.41px',
  },
  contentLink: {
    fontSize: '10px',
    paddingVertical: '8px',
    lineHeight: '0.54',
    cursor: 'pointer',
    letterSpacing: '0.41px',
  },
  socialLink: {
    fontSize: '10px',
    paddingVertical: '2px',
    lineHeight: '1',
    cursor: 'pointer',
    letterSpacing: '0.41px',
  },
  projectView: {
    flexDirection: 'column',
  },
  experienceView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  experienceView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceView2: {
    marginLeft: '10px',
    fontSize: '12px',
    fontWeight: 300,
    paddingTop: '23px',
    lineHeight: '1.2',
    letterSpacing: '0.47px',
  },
  contactView: {
    margin: '0 36px 0 -2px',
    padding: '10px 0 0',
  },
  contactDivider: {
    width: '100%',
    flexDirection: 'row',
    padding: '12px 0 0',
  },
  contactDividerLeft: {
    width: '50%',
    marginRight: '10px',
  },
  contactDividerRight: {
    width: '50%',
  },
  ContactListItem: {
    fontSize: '10px',
    paddingVertical: '2px',
    lineHeight: '1',
    letterSpacing: '0.41px',
  },
})

export const CVPDF = ({
  cvData: {
    firstName,
    lastName,
    desiredPositions,
    profileImage,
    aboutYourself,
    topSkills,
    workingLanguages,
    projects,
    experience,
    education,
    phoneNumber,
    email,
    address,

    personalWebsite,
    githubUrl,
    linkedInUrl,
    twitterUrl,
    behanceUrl,
    stackOverflowUrl,
    dribbbleUrl,
  },
}: any) => {
  return (
    <Document title={`${firstName}_${lastName}_CV.pdf`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText1}>{desiredPositions.join(', ')}</Text>
          <Text style={styles.headerText2}>{firstName}</Text>
          <Text style={styles.headerText3}>{lastName}</Text>
          <Image style={styles.headerImg} src={profileImage} />
        </View>
        <View style={styles.content}>
          <View style={styles.contentLeft}>
            <View style={styles.contentViewLeft}>
              <Text style={styles.contentHeading}>About</Text>
              <Text style={styles.contentPara}>{aboutYourself}</Text>
            </View>
            <View style={styles.contentViewLeft}>
              <Text style={styles.contentHeading}>Skills</Text>
              <View style={styles.ContentList}>
                {topSkills.map((skill, index) => (
                  <Text key={`skill_${index}`} style={styles.ContentListItem}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.contentViewLeft}>
              <Text style={styles.contentHeading}>Languages</Text>
              <View style={styles.ContentList}>
                {workingLanguages.map((language, index) => (
                  <Text
                    key={`language_${index}`}
                    style={styles.ContentListItem}
                  >
                    {language}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.contentViewLeft}>
              <Text style={styles.contentHeading}>{`Projects&Awards`}</Text>
              {projects.map((project, index) => (
                <View key={`project_${index}`} style={styles.projectView}>
                  <Text style={styles.contentSubHeading}>{project.title}</Text>
                  <Link src={project.link} style={styles.contentLink}>
                    {project.link.split('//')[1]}
                  </Link>
                  <Text style={styles.contentPara}>{project.description}</Text>
                </View>
              ))}
              <Text style={styles.contentDummyHeading}>{`!@#$%^!@#$%`}</Text>
            </View>
          </View>
          <View style={styles.contentRight}>
            <View style={styles.contactView}>
              <Text style={styles.contentHeading}>Contact</Text>
              <View style={styles.contactDivider}>
                <View style={styles.contactDividerLeft}>
                  <Text style={styles.ContactListItem}>
                    {concatenateToMultiline([phoneNumber, email, address])}
                  </Text>
                </View>
                <View style={styles.contactDividerRight}>
                  {[
                    personalWebsite,
                    linkedInUrl,
                    githubUrl,
                    twitterUrl,
                    behanceUrl,
                    stackOverflowUrl,
                    dribbbleUrl,
                  ].map((url, index) => {
                    if (!url) return null
                    return (
                      <Link key={index} src={url} style={styles.socialLink}>
                        {url.split('//')[1]}
                      </Link>
                    )
                  })}
                </View>
              </View>
            </View>
            <View style={styles.contentViewRight}>
              <Text style={styles.contentHeading}>Work Experience</Text>
              {experience.map((experience, index) => (
                <View key={`experience_${index}`} style={{ width: '100%' }}>
                  <View style={styles.experienceView}>
                    <View style={styles.experienceView1}>
                      <Text style={styles.contentSubHeading}>
                        {experience.title}
                      </Text>
                      <Text style={styles.experienceView2}>
                        {experience.company}
                      </Text>
                    </View>
                    <Text style={[styles.contentSubHeading]}>
                      {experience.startDate &&
                        moment(experience.startDate).format('MMM YYYY - ')}
                      {experience.endDate &&
                        !experience.current &&
                        moment(experience.endDate).format('MMM YYYY')}
                    </Text>
                  </View>
                  <Text style={styles.contentPara}>
                    {experience.description}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.contentViewRight}>
              <Text style={styles.contentHeading}>Education</Text>
              {education.map((education, index) => (
                <View key={`experience_${index}`} style={{ width: '100%' }}>
                  <View style={styles.experienceView}>
                    <View style={styles.experienceView1}>
                      <Text style={styles.contentSubHeading}>
                        {education.title}
                      </Text>
                      <Text style={styles.experienceView2}>
                        {education.institutionName}
                      </Text>
                    </View>
                    <Text style={[styles.contentSubHeading]}>
                      {education.startDate &&
                        moment(education.startDate).format('MMM YYYY - ')}
                      {education.endDate &&
                        !education.current &&
                        moment(education.endDate).format('MMM YYYY')}
                    </Text>
                  </View>
                  <Text style={styles.contentPara}>
                    {education.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

const concatenateToMultiline = (items: string[]): string => {
  return items
    .reduce((acc, curr) => (curr ? `${acc}\n${curr}` : acc), '')
    .trim()
}

export const CVPDFPreview = (
  { cvData, pdfWidthPx, setLeftColumnContentsHeight }: any //: CVPDFPreviewProps & {
) =>
  //pdfWidthPx: number
  {
    const [instance, updateInstance] = usePDF({
      document: <CVPDF cvData={cvData} />,
    })

    useEffect(() => updateInstance(), [cvData, updateInstance])

    const url = instance.blob ? URL.createObjectURL(instance.blob) : null

    const onRenderSuccess = useCallback(() => {
      console.log('WOHOO!')
      const aboutElementMatches = screen.queryAllByText('ABOUT')
      if (!aboutElementMatches || aboutElementMatches.length == 0) return
      const aboutElement = aboutElementMatches[0]

      const dummyElementMatches = screen.queryAllByText('!@#$%^!@#$%')
      if (!dummyElementMatches || dummyElementMatches.length == 0) return
      const dummyElement = dummyElementMatches[0]

      const height =
        parseInt(dummyElement.style.top, 10) -
        parseInt(aboutElement.style.top, 10)

      setLeftColumnContentsHeight(height)
      console.log(height)
    }, [setLeftColumnContentsHeight])

    return (
      <div>
        {url && (
          <ReactPDFDocument file={url}>
            <ReactPDFPage
              pageNumber={1}
              width={pdfWidthPx}
              onRenderSuccess={() => onRenderSuccess()}
            />
          </ReactPDFDocument>
        )}
      </div>
    )
  }

export const CVPDFPreviewMemoized = React.memo(
  CVPDFPreview,
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
)

export default CVPDFPreview
