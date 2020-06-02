'use strict'

const aws = require('aws-sdk')
const Rx = require('rxjs')
const config = {
  accessKeyId: process.env.EMAILER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.EMAILER_AWS_SECRET_KEY,
  region: process.env.EMAILER_AWS_REGION
}
const { buildFrontendUrl } = require('../build-frontend-url')

const ses = new aws.SES(config)

const isProductionOrDemonstration = () =>
  ['production', 'demonstration', 'staging'].includes(process.env.NODE_ENV)

const sendEmail = Rx.bindNodeCallback(ses.sendEmail.bind(ses))
const sendEmailFactory = (to, subject, body, rediLocation) => {
  let toSanitized = isProductionOrDemonstration()
    ? to
    : 'eric@binarylights.com'
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.DEV_MODE_EMAIL_RECIPIENT
  }
  let sender
  if (rediLocation === 'berlin') {
    sender = 'career@redi-school.org'
  } else if (rediLocation === 'munich') {
    sender = 'munich-career@redi-school.org'
  } else {
    sender = 'career@redi-school.org'
  }
  return sendEmail({
    Source: sender,
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

const RECIPIENT = 'career@redi-school.org'

const sendReportProblemEmail = (sendingUserEmail, problemDescription) =>
  sendEmailFactory(
    RECIPIENT,
    'Problem report',
    templateReportProblemEmail(sendingUserEmail, problemDescription)
  )
const sendMentorCancelledMentorshipNotificationEmail = (recipient, firstName, rediLocation) =>
  sendEmailFactory(
    recipient,
    'Your mentor has quit your connection',
    `Dear ${firstName}, 

Your mentor has decided to quit your connection. We are sorry to hear that. 
You are now ready to see other available mentors and apply to another one. The sessions you have done already will be counted towards the 6 sessions total.

Your Career Support Team
    `,
    rediLocation
  )
const sendToMentorConfirmationOfMentorshipCancelled = (
  recipient,
  mentorFirstName,
  menteeFullName,
  rediLocation
) =>
  sendEmailFactory(
    recipient,
    `Your mentorship of ${menteeFullName} has ben cancelled`,
    `Dear ${mentorFirstName},

We have processed your request to cancel your mentorship of mentee ${menteeFullName}. We have informed the mentee. Now other mentees are able to apply to the spot that freed up.

If you like, let us know why you have decided to cancel the mentorship.

Your Career Support Team
    `,
    rediLocation
  )

const sendMentorshipRequestReceivedEmail = (
  recipient,
  mentorName,
  menteeFullName,
  rediLocation
) =>
  sendEmailFactory(
    recipient,
    `You have received an application from ${menteeFullName}`,
    `Dear ${mentorName},

You have received an application from mentee ${menteeFullName}. Please review it as soon as you have time.

Review application: ${buildFrontendUrl(process.env.NODE_ENV, rediLocation)}

Your Career Support Team
`, rediLocation
  )
const sendMentorshipAcceptedEmail = (recipients, mentorName, menteeName, rediLocation) => {
  let recipientsSanitized = !isProductionOrDemonstration()
    ? ['eric@binarylights.com']
    : recipients
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) { recipientsSanitized = [process.env.DEV_MODE_EMAIL_RECIPIENT] }
  let sender
  if (rediLocation === 'berlin') {
    sender = 'career@redi-school.org'
  } else if (rediLocation === 'munich') {
    sender = 'munich-career@redi-school.org'
  } else {
    sender = 'career@redi-school.org'
  }
  return sendEmail({
    Source: sender,
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

Please let us know at ${rediLocation === 'munich' ? 'munich-' : ''}career@redi-school.org if you have any questions!

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
const sendMentoringSessionLoggedEmail = (recipient, mentorName, rediLocation) =>
  sendEmailFactory(
    recipient,
    'You successfully logged your first session with your mentee',
    `Dear ${mentorName},

Thank you for logging the first session. This is very helpful for us in order to track the students progress. Please keep logging your sessions!

Log next session: ${buildFrontendUrl(process.env.NODE_ENV, rediLocation)}

Your Career Support Team`, rediLocation
  )

const templateReportProblemEmail = (sendingUserEmail, message) =>
  `New problem report. Source: ${sendingUserEmail}. Message: \n\n${message}`

const sendMentorPendingReviewAcceptedEmail = (recipient, firstName, rediLocation) => {
  let body
  if (rediLocation === 'berlin') {
    body = `Dear ${firstName},

Your profile has been accepted and we are very happy that you are now part of the ReDI Community. Please make sure you update your profile regularly and upload your profile picture.

Now that your profile is visible you should receive applications from mentees. We will notify you by email of any application.

We kindly ask you to read the guidelines and information of the mentorship program carefully: ${buildFrontendUrl(
      process.env.NODE_ENV, rediLocation
    )}/downloadeables/redi-connect-guidelines.pdf

Please also be aware of the following:
Code of Conduct: ${buildFrontendUrl(
      process.env.NODE_ENV, rediLocation
    )}/downloadeables/redi-connect-code-of-conduct.pdf

We are organising events regularly where you can meet fellow mentors and get to know ReDI School more.
In order to stay tuned on what is happening in the mentorship program in the ReDI mentor community join our slack universe here: https://app.slack.com/client/T0HN7F83D/CGJFBLBH6

Or check our pages:
Facebook: https://www.facebook.com/redischool
Meetup: https://www.meetup.com/ReDI-school
Instagram: https://www.instagram.com/redischool

You can always log back into ReDI Connect here: ${buildFrontendUrl(
      process.env.NODE_ENV, rediLocation
    )}

Please feel free to write us an email at career@redi-school.org if you have any questions or encounter problems.

Are you ReDI?

Thank you for being a mentor, we couldn’t do it without you.


Your Career Support Team at ReDI Connect`
  } else if (rediLocation === 'munich') {
    body = `Dear ${firstName},

Your profile has been accepted and we are very happy that you are now part of the ReDI Community. Please make sure you update your profile regularly and upload your profile picture.

Now that your profile is visible you should receive applications from mentees. We will notify you by email of any application.

We kindly ask you to read the guidelines and information of the mentorship program carefully: ${buildFrontendUrl(
  process.env.NODE_ENV, rediLocation
)}/downloadeables/redi-connect-guidelines.pdf

Please also be aware of the following:
Code of Conduct: ${buildFrontendUrl(
  process.env.NODE_ENV, rediLocation
)}/downloadeables/redi-connect-code-of-conduct.pdf

We are organising events regularly where you can meet fellow mentors and get to know ReDI School more.
In order to stay tuned on what is happening in the mentorship program and in our community, make sure you are in our slack universe here: https://join.slack.com/t/redimunich/shared_invite/zt-6nkpjwpc-_eqGMQFETvhbP2OiLan5pQ 

And check our social media pages:
Facebook: https://www.facebook.com/redimunich
LinkedIn: https://www.linkedin.com/company/redi-munich/
Instagram: https://www.instagram.com/redimunich/

You can always log back into ReDI Connect here: ${buildFrontendUrl(
  process.env.NODE_ENV, rediLocation
)}

Please feel free to write us an email at munich-career@redi-school.org or christa@redi-school.org if you have any questions or encounter problems.

Are you ReDI?

Thank you for being a mentor, we couldn’t do it without you.


Your Career Support Team at ReDI Connect`
  } else {
    throw new Error('Invalid rediLocation')
  }

  return sendEmailFactory(
    recipient,
    'ReDI Connect: your user was activated!',
    body,
    rediLocation
  )
}

const sendMenteePendingReviewAcceptedEmail = (recipient, firstName, rediLocation) => {
  let body
  if (rediLocation === 'berlin') {
    body = `Dear ${firstName},

Your profile has been accepted and you are now able to see and apply to you future mentor. Just go to ReDI Connect here: ${buildFrontendUrl(
      process.env.NODE_ENV, rediLocation
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
      process.env.NODE_ENV, rediLocation
    )}/downloadeables/redi-connect-code-of-conduct.pdf

Please feel free to write us an email at career@redi-school.org if you have any questions or encounter problems.

Your Career Support Team at ReDI Connect`
  } else if (rediLocation === 'munich') {
    body = `Dear ${firstName},
    
Your profile has been accepted and you are now able to see and apply to your future mentor. Just go to ReDI Connect here: ${buildFrontendUrl(
  process.env.NODE_ENV, rediLocation
)}.

Please make sure you update your profile regularly and upload your profile picture.

Please make sure that once your mentor has accepted your application, to schedule regular meetings with him or her. They are giving their precious time to support you. You should have:

At least 3 meetings per month (can be more). We recommend each session should be around 60 mins, but you can decide that together with your mentor. 

Last semester, those students who had a mentor were more successful in their courses, found jobs and internships easier and understood their own goals much better. 

A mentor can support you throughout the semester with: 
- help with your course
- career advice
- job orientation
- help to find an internship/job

Please note: First come, first serve. Whoever applies first, will get a mentor first. And remember: All successful people have a mentor: Do you know who the mentor of Bill Gates was?

We also kindly remind you to be aware of the following:
Code of Conduct: ${buildFrontendUrl(
  process.env.NODE_ENV, rediLocation
)}/downloadeables/redi-connect-code-of-conduct.pdf

Please feel free to write us an email at munich-career@redi-school.org or to Christa at christa@redi-school.org if you have any questions or encounter problems.

Your Career Support Team at ReDI Connect`
  } else {
    throw new Error('Invalid rediLocation')
  }

  return sendEmailFactory(
    recipient,
    'ReDI Connect: your user was activated!',
    body,
    rediLocation
  )
}

const sendMentorPendingReviewDeclinedEmail = (recipient, firstName, rediLocation) =>
  sendEmailFactory(
    recipient,
    'ReDI Connect: your user sign-up was declined',
    `Dear ${firstName},

Unfortunately your profile has not been accepted yet because we would like to get to know you a little better before.

Please let us know at ${rediLocation === 'munich' ? 'munich-' : ''}career@redi-school.org how we can reach you best so that we can have a little chat. 

Your Career Support Team at ReDI Connect`, rediLocation
  )

const sendMenteePendingReviewDeclinedEmail = (recipient, firstName, rediLocation) =>
  sendEmailFactory(
    recipient,
    'ReDI Connect: your user sign-up was declined',
    `Dear ${firstName},

Unfortunately your profile has not been accepted yet because we would like to get to know you a little better before.

Please let us know at ${rediLocation === 'munich' ? 'munich-' : ''}career@redi-school.org how we can reach you best so that we can have a little chat. 

Your Career Support Team at ReDI Connect`, rediLocation
  )

const sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted = (
  recipient,
  menteeName,
  mentorName,
  rediLocation
) =>
  sendEmailFactory(
    recipient,
    `ReDI Connect: mentorship application from ${menteeName} expired`,
    `Dear ${mentorName},

${menteeName} who applied to become your mentee also applied to another mentor. The other mentor just accepted the application a tiny bit faster ;).

The application to you from ${menteeName} has therefore expired, and you will not see it any longer in ReDI Connect.

Other mentees can of course still apply to you, and we're sure you'll receive another application soon to be a great mentor to one of our students!

If you have any questions or would like any help, always feel free to reach out to us on ${rediLocation === 'munich' ? 'munich-' : ''}career@redi-school.org or on the ReDI Slack channel ${rediLocation === 'munich' ? '#mentors_s2020' : '#redi_mentors2019'}.

Your Career Support Team`, rediLocation
  )

const sendResetPasswordEmail = (recipient, accessToken, rediLocation) =>
  sendEmailFactory(
    recipient,
    'Choose a new password for ReDI Connect',
    `Hey there, 

Someone requested a new password for your ReDI Connect account.

If you didn't make this request then you can safely ignore this email :)

Reset Password: ${buildFrontendUrl(
      process.env.NODE_ENV, rediLocation
    )}/front/reset-password/set-new-password/${accessToken}

You’ll be asked to choose your own password. Your username is your email address: ${recipient}

Let us know if you need any help or assistance at ${rediLocation === 'munich' ? 'munich-' : ''}career@redi-school.org or on the ReDI Slack channel ${rediLocation === 'munich' ? '#mentors_s2020' : '#redi_mentors2019'}.

Your Career Support Team
    `, rediLocation
  )

module.exports = {
  sendReportProblemEmail,
  sendMentorCancelledMentorshipNotificationEmail,
  sendMentorshipRequestReceivedEmail,
  sendMentorshipAcceptedEmail,
  sendMentoringSessionLoggedEmail,
  sendToMentorConfirmationOfMentorshipCancelled,
  sendMentorPendingReviewAcceptedEmail,
  sendMenteePendingReviewAcceptedEmail,
  sendMentorPendingReviewDeclinedEmail,
  sendMenteePendingReviewDeclinedEmail,
  sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted,
  sendResetPasswordEmail,
  sendEmailFactory
}
