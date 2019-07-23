'use strict';

const aws = require('aws-sdk');
const Rx = require('rxjs');
const config = {
  accessKeyId: process.env.EMAILER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.EMAILER_AWS_SECRET_KEY,
  region: process.env.EMAILER_AWS_REGION,
};

const ses = new aws.SES(config);

const sendEmail = Rx.bindNodeCallback(ses.sendEmail.bind(ses));
const sendEmailFactory = (to, subject, body) =>
  sendEmail({
    Source: 'career@redi-school.org',
    Destination: { ToAddresses: [to], BccAddresses: ['eric@binarylights.com'] },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
  });

const RECIPIENT = 'career@redi-school.org';

const sendReportProblemEmail = (sendingUserEmail, problemDescription) =>
  sendEmailFactory(
    RECIPIENT,
    'Problem report',
    templateReportProblemEmail(sendingUserEmail, problemDescription)
  );
const sendDataImportMentorSignupEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'ReDI Connect is finally online!',
    templateDataImportMentorSignupEmail(firstName, accessToken, recipient)
  );
const sendDataImportMenteeSignupEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'ReDI Connect is finally online!',
    templateDataImportMenteeSignupEmail(firstName, accessToken, recipient)
  );
const sendMentorCancelledMentorshipNotificationEmail = (recipient, firstName) =>
  sendEmailFactory(
    recipient,
    'Your mentor has quit your connection',
    `Dear ${firstName}, 

    Your mentor has decided to quit your connection. We are sorry to hear that. 
    You are now ready to see other available mentors and apply to another one. The sessions you have done already will be counted towards the 6 sessions total.
    
    Your Career Support Team
    `
  );
const sendToMentorConfirmationOfMentorshipCancelled = (
  recipient,
  mentorFirstName,
  menteeFullName
) =>
  sendEmailFactory(
    recipient,
    `Your mentorship of ${menteeFullName} has ben cancelled`,
    `Dear ${mentorFirstName},

    We have processed your request to cancel your mentorship of mentee ${menteeFullName}. We have informed the mentee. Now other mentees are able to apply to the spot that freed up.
    
    If you like, let us know why you have decided to cancel the mentorship.
    
    Your Career Support Team
    `
  );

const sendMentorshipRequestReceivedEmail = (
  recipient,
  mentorName,
  menteeFullName
) =>
  sendEmailFactory(
    recipient,
    `You have received an application from ${menteeFullName}`,
    `Dear ${mentorName},

You have received an application from mentee ${menteeFullName}. Please review it as soon as you have time.

Review application: https://connect.redi-school.org

Your Career Support Team
`
  );
const sendMentorshipAcceptedEmail = (recipients, mentorName, menteeName) =>
  sendEmail({
    Source: 'career@redi-school.org',
    Destination: { ToAddresses: recipients },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Dear ${mentorName} and ${menteeName},

        Congratulations. Mentor ${mentorName} has accepted your application, ${menteeName}.
        
        Are you ReDI?!
        
        It would be great if you, ${mentorName}, as the mentor, could send ${menteeName} suggestions for the time, date and place of your first session.
        
        Happy connectin’,
        
        Please let us know at career@redi-school.org if you have any questions!
        
        Your Career Support Team
        `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: "It's a Match!",
      },
    },
  });
const sendMentoringSessionLoggedEmail = (recipient, mentorName) =>
  sendEmailFactory(
    recipient,
    'You successfully logged your first session with your mentee',
    `Dear ${mentorName},

Thank you for logging the first session. This is very helpful for us in order to track the students progress. Please keep logging your sessions!

Log next session: https://connect.redi-school.org

Your Career Support Team`
  );

const templateReportProblemEmail = (sendingUserEmail, message) =>
  `New problem report. Source: ${sendingUserEmail}. Message: \n\n${message}`;
const templateDataImportMentorSignupEmail = (
  firstName,
  accessToken,
  recipientEmail
) => `Dear ${firstName}, 

Thank you for being part of the ReDI Mentorship program.

Are you ReDI for some good news??? Are you ReDI??

ReDI Connect is finally here!

We know it’s taken us a little bit longer than expected, but we wanted to make sure that you are ReDI! Thank you for your patience :)

You are now able to log into our new platform. You’ll be able to log your sessions and connect with mentees.

You will see our data protection policy, which we kindly ask you to read through and consent to.

Access ReDI Connect here: https://connect.redi-school.org/front/signup/existing/${accessToken}

You’ll be asked to choose your own password. Your username is your email address: ${recipientEmail}

Let us know if you need any help or assistance at career@redi-school.org or on slack #redi_mentors2019.

Your Career Support Team`;

const templateDataImportMenteeSignupEmail = (
  firstName,
  accessToken,
  recipientEmail
) => `Dear ${firstName}, 

Are you ReDI for some good news??? Are you really ReDI??

ReDI Connect is finally here!

We know it’s taken us a little bit longer than expected, but we wanted to make sure that you are ReDI! Thank you for your patience :)

You are now able to log into our new platform. You’ll be able to upload a profile picture, view your mentor’s profile, and share any issues you may be facing. If you haven't been assigned a mentor, you are now able to find and connect with your future personal mentor.

You will see our data protection policy, which we kindly ask you to read through and consent to.

Access ReDI Connect here: https://connect.redi-school.org/front/signup/existing/${accessToken}

You’ll be asked to choose your own password. Your username is your email address: ${recipientEmail}

Let us know if you need any help or assistance at career@redi-school.org.

Your Career Support Team
`;

const sendMentorSignupReminderEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'Aren’t you ReDI? :-( ReDI Connect is ReDI for you!',
    `Dear ${firstName}, 

    Thank you for being part of the ReDI Mentorship program.
    
    We sent you some ReDI good news last week, but perhaps you weren’t ReDI? Well, we hope that you are now ReDI!
    
    Now that summer has come, we are certain that you are ReDI to take five minutes to activate your user profile and then connect to all the mentees who are ReDI to connect to you!
    
    After you’ve activated your user profile you’ll be able to log your sessions and connect with mentees.
    
    You will see our data protection policy, which we kindly ask you to read through and consent to.
    
    Access ReDI Connect here: Access ReDI Connect here: https://connect.redi-school.org/front/signup/existing/${accessToken}
    
    You’ll be asked to choose your own password. Your username is your email address: ${recipient}
    
    Let us know if you need any help or assistance at career@redi-school.org or on slack  #redi_mentors2019.
    
    Your Career Support Team
    `
  );
const sendMenteeSignupReminderEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'Aren’t you ReDI? :-( ReDI Connect is ReDI for you!',
    `Dear ${firstName},

    We sent you some ReDI good news last week, but perhaps you weren’t ReDI? Well, we hope that you are now ReDI!
    
    Now that summer has come, we are certain that you are ReDI to take five minutes to activate your user profile and then connect to all the mentors who are ReDI to connect to you!
    
    After you’ve activated your user profile you’ll be able to upload a profile picture, view your mentor’s profile, and share any issues you may be facing.
    
    You will see our data protection policy, which we kindly ask you to read through and consent to.
    
    Access ReDI Connect here: https://connect.redi-school.org/front/signup/existing/${accessToken}
    
    You’ll be asked to choose your own password. Your username is your email address: ${recipient}
    
    Let us know if you need any help or assistance at career@redi-school.org.
    
    Your Career Support Team`
  );

module.exports = {
  sendReportProblemEmail,
  sendDataImportMentorSignupEmail,
  sendDataImportMenteeSignupEmail,
  sendMentorCancelledMentorshipNotificationEmail,
  sendMentorshipRequestReceivedEmail,
  sendMentorshipAcceptedEmail,
  sendMentoringSessionLoggedEmail,
  sendToMentorConfirmationOfMentorshipCancelled,
  sendMentorSignupReminderEmail,
  sendMenteeSignupReminderEmail,
  sendEmailFactory,
};
