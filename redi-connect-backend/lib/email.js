'use strict'

const aws = require('aws-sdk')
const Rx = require('rxjs')
const config = {
  accessKeyId: process.env.EMAILER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.EMAILER_AWS_SECRET_KEY,
  region: process.env.EMAILER_AWS_REGION
}

const ses = new aws.SES(config)

const isProductionOrDemonstration = () =>
  ['production', 'demonstration'].includes(process.env.NODE_ENV)

const sendEmail = Rx.bindNodeCallback(ses.sendEmail.bind(ses))
const sendEmailFactory = (to, subject, body) => {
  let toSanitized = isProductionOrDemonstration()
    ? to
    : 'eric@binarylights.com'
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.DEV_MODE_EMAIL_RECIPIENT
  }
  return sendEmail({
    Source: 'career@redi-school.org',
    Destination: {
      ToAddresses: [toSanitized],
      BccAddresses: ['eric@binarylights.com']
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    }
  })
}

function buildFrontendUrl (env) {
  switch (env) {
    case 'production':
      return 'https://connect.redi-school.org'

    case 'demonstration':
      return 'https://app.demo.connect.redi-school.org'

    default:
    case 'development':
    case 'dev':
      return 'http://127.0.0.1:3000'
  }
}

const RECIPIENT = 'career@redi-school.org'

const sendReportProblemEmail = (sendingUserEmail, problemDescription) =>
  sendEmailFactory(
    RECIPIENT,
    'Problem report',
    templateReportProblemEmail(sendingUserEmail, problemDescription)
  )
const sendDataImportMentorSignupEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'ReDI Connect is finally online!',
    templateDataImportMentorSignupEmail(firstName, accessToken, recipient)
  )
const sendDataImportMenteeSignupEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'ReDI Connect is finally online!',
    templateDataImportMenteeSignupEmail(firstName, accessToken, recipient)
  )
const sendMentorCancelledMentorshipNotificationEmail = (recipient, firstName) =>
  sendEmailFactory(
    recipient,
    'Your mentor has quit your connection',
    `Dear ${firstName}, 

    Your mentor has decided to quit your connection. We are sorry to hear that. 
    You are now ready to see other available mentors and apply to another one. The sessions you have done already will be counted towards the 6 sessions total.
    
    Your Career Support Team
    `
  )
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
  )

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

Review application: ${buildFrontendUrl(process.env.NODE_ENV)}

Your Career Support Team
`
  )
const sendMentorshipAcceptedEmail = (recipients, mentorName, menteeName) => {
  let recipientsSanitized = !isProductionOrDemonstration()
    ? ['eric@binarylights.com']
    : recipients
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) { recipientsSanitized = [process.env.DEV_MODE_EMAIL_RECIPIENT] }
  return sendEmail({
    Source: 'career@redi-school.org',
    Destination: {
      ToAddresses: recipientsSanitized,
      BccAddresses: ['eric@binarylights.com']
    },
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
        `
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: "It's a Match!"
      }
    }
  })
}
const sendMentoringSessionLoggedEmail = (recipient, mentorName) =>
  sendEmailFactory(
    recipient,
    'You successfully logged your first session with your mentee',
    `Dear ${mentorName},

Thank you for logging the first session. This is very helpful for us in order to track the students progress. Please keep logging your sessions!

Log next session: ${buildFrontendUrl(process.env.NODE_ENV)}

Your Career Support Team`
  )

const templateReportProblemEmail = (sendingUserEmail, message) =>
  `New problem report. Source: ${sendingUserEmail}. Message: \n\n${message}`
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

Access ReDI Connect here: ${buildFrontendUrl(
  process.env.NODE_ENV
)}/front/signup/existing/${accessToken}

You’ll be asked to choose your own password. Your username is your email address: ${recipientEmail}

Let us know if you need any help or assistance at career@redi-school.org or on slack #redi_mentors2019.

Your Career Support Team`

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

Access ReDI Connect here: ${buildFrontendUrl(
  process.env.NODE_ENV
)}/front/signup/existing/${accessToken}

You’ll be asked to choose your own password. Your username is your email address: ${recipientEmail}

Let us know if you need any help or assistance at career@redi-school.org.

Your Career Support Team
`

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
    
    Access ReDI Connect here: Access ReDI Connect here: ${buildFrontendUrl(
      process.env.NODE_ENV
    )}/front/signup/existing/${accessToken}
    
    You’ll be asked to choose your own password. Your username is your email address: ${recipient}
    
    Let us know if you need any help or assistance at career@redi-school.org or on slack  #redi_mentors2019.
    
    Your Career Support Team
    `
  )
const sendMenteeSignupReminderEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'Aren’t you ReDI? :-( ReDI Connect is ReDI for you!',
    `Dear ${firstName},

    We sent you some ReDI good news last week, but perhaps you weren’t ReDI? Well, we hope that you are now ReDI!
    
    Now that summer has come, we are certain that you are ReDI to take five minutes to activate your user profile and then connect to all the mentors who are ReDI to connect to you!
    
    After you’ve activated your user profile you’ll be able to upload a profile picture, view your mentor’s profile, and share any issues you may be facing.
    
    You will see our data protection policy, which we kindly ask you to read through and consent to.
    
    Access ReDI Connect here: ${buildFrontendUrl(
      process.env.NODE_ENV
    )}/front/signup/existing/${accessToken}
    
    You’ll be asked to choose your own password. Your username is your email address: ${recipient}
    
    Let us know if you need any help or assistance at career@redi-school.org.
    
    Your Career Support Team`
  )

const sendMentorPendingReviewAcceptedEmail = (recipient, firstName) =>
  sendEmailFactory(
    recipient,
    'ReDI Connect: your user was activated!',
    `Dear ${firstName},

Your profile has been accepted and we are very happy that you are now part of the ReDI Community. Please make sure you update your profile regularly and upload your profile picture.

Now that your profile is visible you should receive applications from mentees. We will notify you by email of any application.

We kindly ask you to read the guidelines and information of the mentorship program carefully: ${buildFrontendUrl(
      process.env.NODE_ENV
    )}/downloadeables/redi-connect-guidelines.pdf

Please also be aware of the following:
Code of Conduct: ${buildFrontendUrl(
      process.env.NODE_ENV
    )}/downloadeables/redi-connect-code-of-conduct.pdf

We are organising events regularly where you can meet fellow mentors and get to know ReDI School more.
In order to stay tuned on what is happening in the mentorship program in the ReDI mentor community join our slack universe here: https://app.slack.com/client/T0HN7F83D/CGJFBLBH6

Or check our pages:
Facebook: https://www.facebook.com/redischool
Meetup: https://www.meetup.com/ReDI-school
Instagram: https://www.instagram.com/redischool

You can always log back into ReDI Connect here: ${buildFrontendUrl(
      process.env.NODE_ENV
    )}

Please feel free to write us an email at career@redi-school.org if you have any questions or encounter problems.

Are you ReDI?

Thank you for being a mentor, we couldn’t do it without you.


Your Career Support Team at ReDI Connect`
  )

const sendMenteePendingReviewAcceptedEmail = (recipient, firstName) =>
  sendEmailFactory(
    recipient,
    'ReDI Connect: your user was activated!',
    `Dear ${firstName},

Your profile has been accepted and you are now able to see and apply to you future mentor. Just go to ReDI Connect here: ${buildFrontendUrl(
      process.env.NODE_ENV
    )}.

Please make sure you update your profile regularly and upload your profile picture.

Please make sure that once your mentor has accepted your application, to schedule regular meetings with him or her. They are giving their precious time to support you. You should have: 

At least 6 meetings in total ( 1:1 or in a small group) // Approx. one session (60 mins.) per month (can be more)
Last semester, those students who had a mentor were more successful in their courses, found jobs and internships easier and understood their own goals much better.  A mentor can support you throughout the semester with:  
help with your course
career advice 
job orientation 
help to find an internship/job 
Please note: First come, first serve. Whoever applies first, will get a mentor first. And remember: All successful people have a mentor: Do you know who the mentor of Bill Gates was?


We also kindly remind you to be aware of the following:
Code of Conduct: ${buildFrontendUrl(
      process.env.NODE_ENV
    )}/downloadeables/redi-connect-code-of-conduct.pdf

Please feel free to write us an email at career@redi-school.org if you have any questions or encounter problems.


Your Career Support Team at ReDI Connect`
  )

const sendMentorPendingReviewDeclinedEmail = (recipient, firstName) =>
  sendEmailFactory(
    recipient,
    'ReDI Connect: your user sign-up was declined',
    `Dear ${firstName},

Unfortunately your profile has not been accepted yet because we would like to get to know you a little better before.

Please let us know at career@redi-school.org how we can reach you best so that we can have a little chat. 


Your Career Support Team at ReDI Connect`
  )

const sendMenteePendingReviewDeclinedEmail = (recipient, firstName) =>
  sendEmailFactory(
    recipient,
    'ReDI Connect: your user sign-up was declined',
    `Dear ${firstName},

Unfortunately your profile has not been accepted yet because we would like to get to know you a little better before.

Please let us know at career@redi-school.org how we can reach you best so that we can have a little chat. 


Your Career Support Team at ReDI Connect`
  )

const sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted = (
  recipient,
  menteeName,
  mentorName
) =>
  sendEmailFactory(
    recipient,
    `ReDI Connect: mentorship application from ${menteeName} expired`,
    `Dear ${mentorName},

${menteeName} who applied to become your mentee also applied to another mentor. The other mentor just accepted the application a tiny bit faster ;).

The application to you from ${menteeName} has therefore expired, and you will not see it any longer in ReDI Connect.

Other mentees can of course still apply to you, and we're sure you'll receive another application soon to be a great mentor to one of our students!

If you have any questions or would like any help, always feel free to reach out to us on career@redi-school.org or on the ReDI Slack channel #redi_mentors2019.

Your Career Support Team`
  )

const sendResetPasswordEmail = (recipient, accessToken) =>
  sendEmailFactory(
    recipient,
    'Choose a new password for ReDI Connect',
    `Hey there, 

Someone requested a new password for your ReDI Connect account.

If you didn't make this request then you can safely ignore this email :)

Reset Password: ${buildFrontendUrl(
      process.env.NODE_ENV
    )}/front/reset-password/set-new-password/${accessToken}

You’ll be asked to choose your own password. Your username is your email address: ${recipient}

Let us know if you need any help or assistance at career@redi-school.org or on slack #redi_mentors2019.

Your Career Support Team
    `
  )

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
  sendMentorPendingReviewAcceptedEmail,
  sendMenteePendingReviewAcceptedEmail,
  sendMentorPendingReviewDeclinedEmail,
  sendMenteePendingReviewDeclinedEmail,
  sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted,
  sendResetPasswordEmail,
  sendEmailFactory
}
