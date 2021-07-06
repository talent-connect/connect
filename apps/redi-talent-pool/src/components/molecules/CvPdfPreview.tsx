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
import React, { useEffect } from 'react'
import {
  Document as ReactPDFDocument,
  Page as ReactPDFPage,
  pdfjs,
} from 'react-pdf/dist/esm/entry.webpack'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

Font.register({
  family: 'Avenir LT Std',
  fonts: [
    {
      src: '/assets/fonts/Avenir-Black.woff',
      fontWeight: 900,
      fontStyle: 'normal',
    },
    {
      src: '/assets/fonts/Avenir-Heavy.woff',
      fontWeight: 800,
      fontStyle: 'normal',
    },
    {
      src: '/assets/fonts/Avenir-Medium.woff',
      fontWeight: 500,
      fontStyle: 'normal',
    },
    {
      src: '/assets/fonts/Avenir-MediumOblique.woff',
      fontWeight: 500,
      fontStyle: 'oblique',
    },
    {
      src: '/assets/fonts/AvenirLTStd-Book.woff',
      fontWeight: 300,
      fontStyle: 'normal',
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
    height: '100%',
    padding: '0 48px',
  },
  header: {
    height: '200px',
    position: 'relative',
  },
  headerText1: {
    top: '50px',
    left: '37%',
    position: 'absolute',
    fontSize: '14px',
    marginBottom: '25px',
    letterSpacing: '0.63px',
  },
  headerText2: {
    top: '70px',
    left: '37%',
    position: 'absolute',
    fontSize: '40px',
    fontWeight: 900,
    textTransform: 'uppercase',
  },
  headerText3: {
    top: '110px',
    left: '37%',
    position: 'absolute',
    fontSize: '40px',
    fontWeight: 900,
    textTransform: 'uppercase',
  },
  headerImg: {
    top: '40px',
    position: 'absolute',
    width: '156px',
    height: '156px',
    borderRadius: '50%',
  },
  content: {
    flexDirection: 'row',
  },
  contentLeft: {
    flexDirection: 'column',
    width: '32%',
    marginTop: '30px',
    borderRadius: '8px',
    padding: '8px',
  },
  whitespaceBetweenLeftAndRight: {
    width: '3%',
  },
  contentRight: {
    flexDirection: 'column',
    width: '65%',
    borderRadius: '8px',
    padding: '8px',
  },
  contentViewLeft: {
    // margin: '10px 29px 0 36px',
    padding: '8px 0',
    borderTop: '1px solid #707070',
  },
  contentViewRight: {
    // margin: '15px 36px 0 -2px',
    padding: '8px 0',
    borderTop: '1px solid #707070',
  },
  contentHeading: {
    fontSize: '12px',
    fontWeight: 800,
    lineHeight: '1.25',
    letterSpacing: '0.63px',
    textTransform: 'uppercase',
  },
  contentSubHeading: {
    fontSize: '8px',
    fontWeight: 800,
    paddingTop: '12px',
    lineHeight: '1',
    letterSpacing: '0.47px',
    transform: 'uppercase',
  },
  ContentList: {
    fontSize: '8px',
    paddingTop: '5px',
    paddingBottom: '12px',
    lineHeight: '1.25',
  },
  ContentListItem: {
    fontSize: '8px',
    paddingVertical: '5px',
    lineHeight: '0.54',
    letterSpacing: '0.41px',
  },
  contentPara: {
    fontSize: '8px',
    paddingTop: '10px',
    paddingBottom: '12px',
    lineHeight: '1.25',
    letterSpacing: '0.41px',
  },
  contentLink: {
    fontSize: '8px',
    paddingTop: '8px',
    lineHeight: '1',
    cursor: 'pointer',
    letterSpacing: '0.41px',
  },
  socialLink: {
    fontSize: '8px',
    lineHeight: '1.25',
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
    fontSize: '8px',
    fontWeight: 300,
    lineHeight: '1',
    letterSpacing: '0.47px',
  },
  experienceView2SameLine: {
    marginLeft: '10px',
    paddingTop: '15.5px',
  },
  experienceView2NewLine: {
    paddingTop: '5px',
  },
  // contactView: {
  //   margin: '0 36px 0 -2px',
  //   padding: '10px 0 0',
  // },
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
  ContactPhoneNumber: {
    fontSize: '8px',
    lineHeight: '2',
    letterSpacing: '0.41px',
  },
  ContactListItem: {
    fontSize: '8px',
    lineHeight: '1.25',
    letterSpacing: '0.41px',
  },
  hiddenText: {
    height: 0,
    fontSize: 0,
    color: '#ffffff',
  },
})

function isVeryLongExperienceLine(experience) {
  return experience.title.length + experience.company.length > 43
}

function isVeryLongEducationLine(education) {
  return education.type.length + education.institutionName.length > 43
}

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
            <Text style={styles.hiddenText}>startOfContentLeft</Text>
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
              <Text style={styles.contentHeading}>{`Display Case`}</Text>
              {projects.map((project, index) => (
                <View key={`project_${index}`} style={styles.projectView}>
                  <Text style={styles.contentSubHeading}>{project.title}</Text>
                  <Link src={project.link} style={styles.contentLink}>
                    {project.link.split('//')[1]}
                  </Link>
                  <Text style={styles.contentPara}>{project.description}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.hiddenText}>endOfContentLeft</Text>
          </View>
          <View style={styles.whitespaceBetweenLeftAndRight} />
          <View style={styles.contentRight}>
            <View style={styles.contentViewRight}>
              <Text style={styles.contentHeading}>Contact</Text>
              <View style={styles.contactDivider}>
                <View style={styles.contactDividerLeft}>
                  <Text style={styles.ContactPhoneNumber}>
                    {concatenateToMultiline([phoneNumber])}
                  </Text>
                  <Text style={styles.ContactListItem}>
                    {concatenateToMultiline([email, address])}
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
                    <View
                      style={
                        isVeryLongExperienceLine(experience)
                          ? undefined
                          : styles.experienceView1
                      }
                    >
                      <Text style={styles.contentSubHeading}>
                        {experience.title}
                      </Text>
                      <Text
                        style={[
                          styles.experienceView2,
                          isVeryLongExperienceLine(experience)
                            ? styles.experienceView2NewLine
                            : styles.experienceView2SameLine,
                        ]}
                      >
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
                    <View
                      style={
                        isVeryLongEducationLine(education)
                          ? undefined
                          : styles.experienceView1
                      }
                    >
                      <Text style={[styles.contentSubHeading]}>
                        {education.type}
                      </Text>
                      <Text
                        style={[
                          styles.experienceView2,
                          isVeryLongEducationLine(education)
                            ? styles.experienceView2NewLine
                            : styles.experienceView2SameLine,
                        ]}
                      >
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

const getNode = (xPath: string) => {
  return document.evaluate(
    xPath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue as HTMLElement
}

const getNodeTopPosition = (xPath: string) => {
  const node = document.evaluate(
    xPath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue as HTMLElement

  return Number(node?.style?.top?.replace('px', '')) || 0
}

export const CVPDFPreview = (
  { cvData, pdfHeightPx, pdfWidthPx }: any //: CVPDFPreviewProps & {
) =>
  //pdfWidthPx: number
  {
    const [instance, updateInstance] = usePDF({
      document: <CVPDF cvData={cvData} />,
    })

    useEffect(() => updateInstance(), [cvData, updateInstance])

    const url = instance.blob ? URL.createObjectURL(instance.blob) : null

    // TODO: might be useful later when we introduce editing through PDF Preview
    const onPDFPageRenderSuccess = () => {
      const startNodeTopPosition = getNodeTopPosition(
        "//span[text()='startOfContentLeft']"
      )
      const endNodeTopPosition = getNodeTopPosition(
        "//span[text()='endOfContentLeft']"
      )

      const contentLeftCurrentHeight = endNodeTopPosition - startNodeTopPosition
      const contentLeftMaxHeight = pdfHeightPx - startNodeTopPosition
      const contentLeftRemainingHeight = pdfHeightPx - endNodeTopPosition

      console.debug({
        contentLeftCurrentHeight,
        contentLeftMaxHeight,
        contentLeftRemainingHeight,
      })

      const contentHeadings = [
        'ABOUT',
        'SKILLS',
        'LANGUAGES',
        'DISPLAY CASE',
        'CONTACT',
        'ROXK EhPEXIENCE',
        'EDUCATION',
      ]

      contentHeadings.forEach((contentHeading) => {
        const headingNode = getNode(`//span[text()='${contentHeading}']`)

        if (headingNode) {
          headingNode.className = 'clickable-content-heading'
          headingNode.onclick = () => alert(`Hello ${headingNode}`)
        }
      })
    }

    return (
      <div>
        {url && (
          <ReactPDFDocument file={url}>
            <ReactPDFPage
              pageNumber={1}
              width={pdfWidthPx}
              onRenderError={console.error}
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
