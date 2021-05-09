import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Link,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  header: {
    color: "#fff",
    height: "200px",
    backgroundColor: "#09375A",
    position: "relative",
  },
  headerText1: {
    top: "50px",
    left: "270px",
    position: "absolute",
    fontSize: "13px",
    marginBottom: "10px",
  },
  headerText2: {
    top: "70px",
    left: "270px",
    position: "absolute",
    fontSize: "40px",
    textTransform: "uppercase",
  },
  headerText3: {
    top: "110px",
    left: "270px",
    position: "absolute",
    fontSize: "40px",
    textTransform: "uppercase",
  },
  headerImg: {
    top: "50px",
    left: "34.5px",
    position: "absolute",
    width: "170px",
    height: "250px",
  },
  content: {
    flexDirection: "row",
  },
  contentLeft: {
    flexDirection: "column",
    width: "40%",
    marginTop: "115px",
  },
  contentRight: {
    flexDirection: "column",
    width: "60%",
  },
  contentView: {
    margin: "15px 36px 0",
    padding: "10px 0",
    borderTop: "1px solid #000",
  },
  contentHeading: {
    fontSize: "15px",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  contentSubHeading: {
    fontSize: "14px",
    fontWeight: "700",
    paddingTop: "8px",
    lineHeight: "1px",
  },
  ContentList: {
    fontSize: "12px",
    paddingTop: "8px",
    lineHeight: "1px",
  },
  contentPara: {
    fontSize: "12px",
    paddingTop: "8px",
    lineHeight: "1.5px",
  },
  contentLink: {
    fontSize: "12px",
    paddingTop: "8px",
    lineHeight: "1px",
    cursor: "pointer",
    textDecoration: "underline",
  },
  projectView: {
    flexDirection: "column",
  },
  experienceView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  experienceView1: {
    marginLeft: "5px",
  },
  contactView: {
    margin: "15px 36px 0",
    padding: "10px 0",
  },
  contactDivider: {
    width: "100%",
    flexDirection: "row",
  },
  contactDividerLeft: {
    width: "70%",
  },
  contactDividerRight: {
    width: "30%",
  },
});

export interface userExperience {
  title: string;
  company: string;
  startDate: Date;
  endDate: Date;
  rolesResponsibilities: string;
  description: string;
}
export interface userEducation {
  type: string;
  institutionName: string;
  startDate: Date;
  endDate: Date;
  description: string;
}
export interface userProject {
  name: string;
  link: string;
  description: string;
}
export interface UserCVData {
  desiredPositions: string[];
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  phoneNumber: string;
  address: string;
  personalWebsite: string;
  workingLanguage: string[];
  yearsOfRelevantExperience: string;
  desiredEmploymentType: string;
  availability: string;
  aboutYourself: string;
  topSkills: string[];
  experience: userExperience[];
  education: userEducation[];
  projects: userProject[];
  linkedin: string;
  github: string;
}
interface CVPDFProps {
  cvData: UserCVData;
}

const CVPDF = ({
  cvData: {
    firstName,
    lastName,
    desiredPositions,
    profileImage,
    aboutYourself,
    topSkills,
    workingLanguage,
    projects,
    experience,
    education,
    phoneNumber,
    address,
    personalWebsite,
    linkedin,
    github,
  },
}: CVPDFProps) => {
  return (
    <Document title={`${firstName}_${lastName}_CV.pdf`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText1}>{desiredPositions.join(", ")}</Text>
          <Text style={styles.headerText2}>{firstName}</Text>
          <Text style={styles.headerText3}>{lastName}</Text>
          <Image style={styles.headerImg} src={profileImage} />
        </View>
        <View style={styles.content}>
          <View style={styles.contentLeft}>
            <View style={styles.contentView}>
              <Text style={styles.contentHeading}>About</Text>
              <Text style={styles.contentPara}>{aboutYourself}</Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentHeading}>Skills</Text>
              {topSkills.map((skill, index) => (
                <Text key={`skill_${index}`} style={styles.ContentList}>
                  {skill}
                </Text>
              ))}
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentHeading}>Languages</Text>
              {workingLanguage.map((language, index) => (
                <Text key={`language_${index}`} style={styles.ContentList}>
                  {language}
                </Text>
              ))}
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentHeading}>{`Projects & Awards`}</Text>
              {projects.map((project, index) => (
                <View key={`project_${index}`} style={styles.projectView}>
                  <Text style={styles.contentSubHeading}>{project.name}</Text>
                  <Link src={project.link} style={styles.contentLink}>
                    Link
                  </Link>
                  <Text style={styles.contentPara}>{project.description}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.contentRight}>
            <View style={styles.contactView}>
              <Text style={styles.contentHeading}>Contact</Text>
              <View style={styles.contactDivider}>
                <View style={styles.contactDividerLeft}>
                  <Text style={styles.ContentList}>{phoneNumber}</Text>
                  <Text style={styles.ContentList}>{address}</Text>
                </View>
                <View style={styles.contactDividerRight}>
                  <Link src={personalWebsite} style={styles.contentLink}>
                    Website
                  </Link>
                  <Link src={linkedin} style={styles.contentLink}>
                    LinkedIn
                  </Link>
                  <Link src={github} style={styles.contentLink}>
                    Github
                  </Link>
                </View>
              </View>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentHeading}>Work Experience</Text>
              {experience.map((experience, index) => (
                <View key={`experience_${index}`} style={{ width: "100%" }}>
                  <View style={styles.experienceView}>
                    <Text style={styles.contentSubHeading}>
                      {experience.title}
                    </Text>
                    <Text style={styles.contentSubHeading}>
                      {experience.company}
                    </Text>
                    <Text style={[styles.contentSubHeading]}>
                      {`${experience.startDate.getMonth()}/${experience.startDate.getFullYear()} - ${experience.endDate.getMonth()}/${experience.endDate.getFullYear()}`}
                    </Text>
                  </View>
                  <Text style={styles.contentPara}>
                    {experience.description}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentHeading}>Education</Text>
              {education.map((education, index) => (
                <View key={`experience_${index}`} style={{ width: "100%" }}>
                  <View style={styles.experienceView}>
                    <Text style={styles.contentSubHeading}>
                      {education.type}
                    </Text>
                    <Text style={styles.contentSubHeading}>
                      {education.institutionName}
                    </Text>
                    <Text style={[styles.contentSubHeading]}>
                      {`${education.startDate.getMonth()}/${education.startDate.getFullYear()} - ${education.endDate.getMonth()}/${education.endDate.getFullYear()}`}
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
  );
};

export default CVPDF;
