const app = require('../server/server');

const RedProfile = app.models.RedProfile;

(async () => {
  const allProfiles = await RedProfile.find({ include: 'redUser' });
  allProfiles.forEach(async (profile) => {
    const topicMapping = allOldTopics[profile.rediLocation];
    const topics = profile.categories.reduce((topicList, topicId) => {
      const newTopic = topicMapping.find((t) => t.id === topicId);
      if (!newTopic) {
        throw new Error(`Couldn't find mapping for topic ${topicId}`);
      }
      const newTopicId = newTopic.mapTo;
      if (!newTopicId) return topicList;
      if (typeof newTopicId === 'string') return [...topicList, newTopicId];
      return [...topicList, ...newTopicId];
    }, []);
    await profile.updateAttribute('categories', topics);
  });
})();

const berlinTopics = [
  { id: 'blockchain', label: 'Blockchain', group: 'coding', mapTo: 'blockchain' },
  {
    id: 'basicComputer',
    label: 'Basic Computer',
    group: 'coding',
    mapTo: 'basicProgrammingSkills',
  },
  { id: 'basicJava', label: 'Basic Java', group: 'coding', mapTo: 'java' },
  { id: 'basicPython', label: 'Basic Python', group: 'coding', mapTo: 'python' },
  { id: 'react', label: 'React', group: 'coding', mapTo: 'react' },
  {
    id: 'itAndNetworking',
    label: 'IT & Networking',
    group: 'careerSupport',
    mapTo: 'computerNetworking',
  },
  { id: 'swift', label: 'Swift', group: 'coding', mapTo: 'mobileDevelopmentIos' },
  {
    id: 'interviewsAndCommunication',
    label: 'Interviews & Communications',
    group: 'careerSupport',
    mapTo: 'interviewPreparation',
  },
  {
    id: 'helpToImproveGerman',
    label: 'German language skills',
    group: 'other',
    mapTo: 'basicGerman',
  },
  {
    id: 'graphicsAndUxUi',
    label: 'Graphics & UX/UI',
    group: 'other',
    mapTo: ['graphicDesign', 'userInterfaceDesign', 'userExperienceDesign'],
  },
  {
    id: 'cvPersonalPresentation',
    label: 'CV & Personal presentation',
    group: 'careerSupport',
    mapTo: ['jobApplicationsCvPreparationGerman', 'jobApplicationsCvPreparationEnglish'],
  },
  {
    id: 'mobileDevelopment',
    label: 'Mobile Development',
    group: 'coding',
    mapTo: ['mobileDevelopmentIos', 'mobileDevelopmentAndroid'],
  },
  {
    id: 'jobOrientation',
    label: 'Job Orientation',
    group: 'careerSupport',
    mapTo: 'careerOrientationAndPlanning',
  },
  { id: 'pythonDataScience', label: 'Python Data Science', group: 'coding', mapTo: 'python' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', group: 'other', mapTo: 'entrepreneurship' },
  { id: 'javaDevelopment', label: 'Java Development', group: 'coding', mapTo: 'java' },
  { id: 'iot', label: 'IoT', group: 'coding', mapTo: 'iot' },
  {
    id: 'webDevelopment',
    label: 'Web Development',
    group: 'coding',
    mapTo: ['htmlCss', 'javascript'],
  },
  { id: 'javascript', label: 'JavaScript', group: 'coding', mapTo: 'javascript' },
  { id: 'htmlcss', label: 'HTML&CSS', group: 'coding', mapTo: 'htmlCss' },
  {
    id: 'findingInternship',
    label: 'Finding an internship',
    group: 'careerSupport',
    mapTo: 'internshipOrWorkingStudent',
  },
  { id: 'freelancing', label: 'Freelancing', group: 'other', mapTo: 'freelancing' },
  { id: 'salesforce', label: 'Salesforce', group: 'other', mapTo: 'salesforce' },
  { id: 'dontKnowYet', label: "I don't know yet", group: 'other', mapTo: 'dontKnowYet' },
];

const munichTopics = [
  {
    id: 'munich_frontEndDevelopmentHTMLCSS',
    label: 'Front-End Dev with HTML/CSS',
    group: 'coding',
    mapTo: 'htmlCss',
  },
  {
    id: 'munich_frontEndDevelopmentJavaScript',
    label: 'Front-End Dev with JavaScript',
    group: 'coding',
    mapTo: 'javascript',
  },
  {
    id: 'munich_softwareDevelopmentBasicJava',
    label: 'Software Dev basic (Java)',
    group: 'coding',
    mapTo: 'java',
  },
  {
    id: 'munich_softwareDevelopmentIntermediateJava',
    label: 'Software Dev intermediate (Java)',
    group: 'coding',
    mapTo: 'java',
  },
  {
    id: 'munich_dataAnalyticsBasic',
    label: 'Basic Data Analytics',
    group: 'coding',
    mapTo: 'python',
  },
  {
    id: 'munich_dataAnalyticsIntermediate',
    label: 'Intermediate Data Analytics ',
    group: 'coding',
    mapTo: 'dataAnalytics',
  },
  { id: 'munich_devOps', label: 'DevOps', group: 'coding', mapTo: 'devOpsCloud' },
  {
    id: 'munich_itAndNetworking',
    label: 'Networking',
    group: 'coding',
    mapTo: 'computerNetworking',
  },
  {
    id: 'munich_helpAndGuidanceOnHowToUseAComputer',
    label: 'Basic Computer Skills in English',
    group: 'coding',
    mapTo: null,
  },
  {
    id: 'munich_helpAndGuidanceOnHowToUseAComputer_de',
    label: 'Basic Computer Skills in German',
    group: 'coding',
    mapTo: null,
  },
  {
    id: 'munich_programmingSkillsAndHelpForLearning',
    label: 'Basic programming skills',
    group: 'coding',
    mapTo: 'basicProgrammingSkills',
  },
  {
    id: 'munich_careerPlanningAndJobOrientation',
    label: 'Career planning & job orientation',
    group: 'careerSupport',
    mapTo: 'careerOrientationAndPlanning',
  },
  {
    id: 'munich_helpForCvPreparationAndApplicationProcess',
    label: 'CV preparation & applications',
    group: 'careerSupport',
    mapTo: ['jobApplicationsCvPreparationGerman', 'jobApplicationsCvPreparationEnglish'],
  },
  {
    id: 'munich_helpForInterviewPreparation',
    label: 'Interview preparation',
    group: 'careerSupport',
    mapTo: 'interviewPreparation',
  },
  {
    id: 'munich_motivationAndEncouragement',
    label: 'Motivation & encouragement',
    group: 'other',
    mapTo: 'motivationAndEncouragement',
  },
  {
    id: 'munich_helpToImproveEnglish',
    label: 'English language skills',
    group: 'other',
    mapTo: 'english',
  },
  {
    id: 'munich_helpToImproveGerman',
    label: 'German language skills',
    group: 'other',
    mapTo: 'basicGerman',
  },
  { id: 'munich_freelancing', label: 'Freelancing', group: 'other', mapTo: 'freelancing' },
  {
    id: 'munich_entrepreneurship',
    label: 'Entrepreneurship',
    group: 'other',
    mapTo: 'entrepreneurship',
  },
  {
    id: 'munich_beAFriendToHelpInNewAndDifficultSituationsHereInGermany',
    label: 'Be a friend and help',
    group: 'other',
    mapTo: 'friendAndHelp',
  },
  { id: 'munich_dontKnowYet', label: "I don't know yet", group: 'other', mapTo: 'dontKnowYet' },
];

const nrwTopics = [
  {
    id: 'nrw_userInterfaceDesign',
    label: 'User Interface Design',
    group: 'other',
    mapTo: 'userInterfaceDesign',
  },
  {
    id: 'nrw_userExperienceDesign',
    label: 'User Experience Design',
    group: 'other',
    mapTo: 'userExperienceDesign',
  },
  { id: 'nrw_python', label: 'Python', group: 'coding', mapTo: 'python' },
  { id: 'nrw_dataAnalytics', label: 'Data Analytics ', group: 'coding', mapTo: 'dataAnalytics' },
  {
    id: 'nrw_machineLearning',
    label: 'Machine Learning',
    group: 'coding',
    mapTo: 'machineLearning',
  },
  { id: 'nrw_HtmlCss', label: 'HTML & CSS', group: 'coding', mapTo: 'htmlCss' },
  {
    id: 'nrw_webDevelopmentJavacsript',
    label: 'Web Development with Javascript',
    group: 'coding',
    mapTo: 'javascript',
  },
  {
    id: 'nrw_webDevelopmentReact',
    label: 'Web Development with React',
    group: 'coding',
    mapTo: 'react',
  },
  {
    id: 'nrw_basicNetworking',
    label: 'Basic Networking',
    group: 'coding',
    mapTo: 'computerNetworking',
  },
  { id: 'nrw_iot', label: 'IoT', group: 'coding', mapTo: 'iot' },
  { id: 'nrw_cloud', label: 'Cloud', group: 'coding', mapTo: 'devOpsCloud' },
  {
    id: 'nrw_businessGerman',
    label: 'Business German',
    group: 'careerSupport',
    mapTo: 'businessGerman',
  },
  {
    id: 'nrw_jobOrientation',
    label: 'Job Orientation',
    group: 'careerSupport',
    mapTo: 'careerOrientationAndPlanning',
  },
  {
    id: 'nrw_cvPreparationAndLinkedInProfile',
    label: 'CV Preparation & LinkedIn Profile',
    group: 'careerSupport',
    mapTo: 'jobApplicationsCvPreparationEnglish',
  },
  {
    id: 'nrw_jobApplicationJobInterview',
    label: 'Job Application & Job Interview',
    group: 'careerSupport',
    mapTo: 'interviewPreparation',
  },
  {
    id: 'nrw_howToFindAnInternship',
    label: 'How to find an Internship',
    group: 'careerSupport',
    mapTo: 'internshipOrWorkingStudent',
  },
  {
    id: 'nrw_howToBuildProfessionalNetwork',
    label: 'How to Build a Professional Network',
    group: 'careerSupport',
    mapTo: 'buildingProfessionalNetwork',
  },
  {
    id: 'nrw_entrepreneurship',
    label: 'Entrepreneurship',
    group: 'careerSupport',
    mapTo: 'entrepreneurship',
  },
  { id: 'nrw_freelancing', label: 'Freelancing', group: 'careerSupport', mapTo: 'freelancing' },
];

const allOldTopics = {
  berlin: berlinTopics,
  nrw: nrwTopics,
  munich: munichTopics,
};

const oldGroups = {
  coding: 'Coding',
  careerSupport: 'Career Support',
  other: 'Other',
};

const newCategories = [
  { id: 'softwareEngineering', label: '👩‍💻 Software Engineering' },
  { id: 'design', label: '🎨 Design' },
  { id: 'otherProfessions', label: '🏄‍♀️ Other professions' },
  { id: 'careerSupport', label: '✋ Career Support' },
  { id: 'language', label: '🗣️ Language' },
  { id: 'other', label: '🤗 Other' },
];

const newTopics = [
  { id: 'basicProgrammingSkills', label: 'Basic programming skills', group: 'softwareEngineering' },
  { id: 'htmlCss', label: 'HTML & CSS', group: 'softwareEngineering' },
  { id: 'javascript', label: 'Javascript', group: 'softwareEngineering' },
  { id: 'react', label: 'React', group: 'softwareEngineering' },
  { id: 'java', label: 'Java', group: 'softwareEngineering' },
  { id: 'python', label: 'Python', group: 'softwareEngineering' },
  { id: 'dataAnalytics', label: 'Data Analytics', group: 'softwareEngineering' },
  { id: 'machineLearning', label: 'Machine Learning', group: 'softwareEngineering' },
  { id: 'mobileDevelopmentIos', label: 'iOS Mobile Development', group: 'softwareEngineering' },
  {
    id: 'mobileDevelopmentAndroid',
    label: 'Android Mobile Development',
    group: 'softwareEngineering',
  },
  { id: 'salesforce', label: 'Salesforce', group: 'softwareEngineering' },
  { id: 'devOpsCloud', label: 'DevOps and Cloud (e.g. Azure, AWS)', group: 'softwareEngineering' },
  { id: 'iot', label: 'IoT', group: 'softwareEngineering' },
  { id: 'computerNetworking', label: 'Computer Networking', group: 'softwareEngineering' },
  { id: 'blockchain', label: 'Blockchain', group: 'softwareEngineering' },
  { id: 'productManagement', label: 'Product Management', group: 'otherProfessions' },
  { id: 'projectManagement', label: 'Project Management', group: 'otherProfessions' },
  { id: 'digitalMarketing', label: 'Digital Marketing', group: 'otherProfessions' },
  { id: 'businessDevelopment', label: 'Business Development', group: 'otherProfessions' },
  { id: 'sales', label: 'Sales', group: 'otherProfessions' },
  { id: 'qualityAssurance', label: 'Quality Assurance', group: 'otherProfessions' },
  { id: 'basicGerman', label: 'Basic German 🇩🇪', group: 'language' },
  { id: 'businessGerman', label: 'Business German 🇩🇪', group: 'language' },
  { id: 'english', label: 'English 🇬🇧', group: 'language' },
  { id: 'graphicDesign', label: 'Graphic Design', group: 'design' },
  { id: 'userInterfaceDesign', label: 'User Interface Design', group: 'design' },
  { id: 'userExperienceDesign', label: 'User Experience Design', group: 'design' },
  { id: 'motivationAndEncouragement', label: 'Motivation & encouragement', group: 'other' },
  { id: 'friendAndHelp', label: 'Be a friend and help', group: 'other' },
  { id: 'dontKnowYet', label: "I don't know yet", group: 'other' },
  {
    id: 'careerOrientationAndPlanning',
    label: 'Career orientation & planning',
    group: 'careerSupport',
  },
  {
    id: 'internshipOrWorkingStudent',
    label: 'Internship / working student position search',
    group: 'careerSupport',
  },
  { id: 'jobSearch', label: 'Job search', group: 'careerSupport' },
  {
    id: 'jobApplicationsCvPreparationEnglish',
    label: 'Job applications and CV preparation in English',
    group: 'careerSupport',
  },
  {
    id: 'jobApplicationsCvPreparationGerman',
    label: 'Job applications and CV preparation in German',
    group: 'careerSupport',
  },
  { id: 'interviewPreparation', label: 'Interview preparation', group: 'careerSupport' },
  {
    id: 'codingChallengePreparation',
    label: 'Coding challenge preparation',
    group: 'careerSupport',
  },
  {
    id: 'buildingProfessionalNetwork',
    label: 'Building a professional network',
    group: 'careerSupport',
  },
  { id: 'entrepreneurship', label: 'Entrepreneurship', group: 'careerSupport' },
  { id: 'freelancing', label: 'Freelancing', group: 'careerSupport' },
];
