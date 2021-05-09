import React from "react";
import CVPDFPreview from "../../components/organisms/CVPDFPreview";
import { Columns } from "react-bulma-components";
import ReactPDF, { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import CVDownloadButton from "../../components/organisms/CVDownloadButton";
import CVPDFSample from "../../components/organisms/CVPDFSample";
import { UserCVData } from "../../components/organisms/CVPDF";

const ReactPdf = () => {
  const UserData: UserCVData = {
    desiredPositions: ["Frontend Engineer"],
    firstName: "Eric",
    lastName: "Bolikowski",
    profileImage:
      "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    email: "eric@binarylights.com",
    phoneNumber: "0176 4368 9941",
    address: "Bla bla bla my address in Berlin",
    personalWebsite: "https://www.binarylights.com",
    workingLanguage: ["Norwegian", "English"],
    yearsOfRelevantExperience: "10+",
    desiredEmploymentType: "Freelance",
    availability: "Immediately",
    aboutYourself:
      "Hello, I like cats and I'm very enaged in ReDI School. Are you ReDI?",
    topSkills: ["jest", "attentiveToDetail"],
    experience: [
      {
        title: "Founder",
        company: "Binary Lights",
        startDate: new Date(),
        endDate: new Date(),
        rolesResponsibilities: "blabla",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        title: "Founder",
        company: "Binary Lights",
        startDate: new Date(),
        endDate: new Date(),
        rolesResponsibilities: "blabla",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
    ],
    education: [
      {
        type: "High School",
        institutionName: "St. Olav VGS",
        startDate: new Date(),
        endDate: new Date(),
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        type: "High School",
        institutionName: "St. Olav VGS",
        startDate: new Date(),
        endDate: new Date(),
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
    ],
    projects: [
      {
        name: "Project Name",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
        link: "https://project.de",
      },
    ],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  };

  const styles = StyleSheet.create({
    viewer: {
      width: "50vw",
      height: "100vh",
    },
  });

  return (
    <Columns>
      <Columns.Column style={styles.viewer}>
        {/* <PDFViewer  */}
        <CVPDFPreview cvData={UserData} />
        {/* <CVPDFSample /> */}
        {/* </PDFViewer> */}
      </Columns.Column>
      <Columns.Column>
        <CVDownloadButton cvData={UserData} />
      </Columns.Column>
    </Columns>
  );
};
export default ReactPdf;
