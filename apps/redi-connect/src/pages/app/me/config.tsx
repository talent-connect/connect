export const STEPS = [
  {
    name: `Fill out your profile`,
    message: {
      mentee: (
        <>
          <strong>Go ahead and fill out your profile below.</strong> Make sure
          you complete all the required fields (everything but the optional
          ones). This helps potential mentors know you better and find the
          perfect match.
        </>
      ),
      mentor: (
        <>
          <strong>Go ahead and fill out your profile below.</strong> Make sure
          you complete all the required fields (everything but the optional
          ones). This helps potential mentees know you better and find the
          perfect match.
        </>
      ),
    },
  },
  {
    name: `Send profile for review`,
    message: {
      mentee: (
        <>
          <strong>Awesome!</strong> You've completed all the required fields.
          Click the button at the bottom of this page to submit your profile.
          Don't worry, you can always edit and update your profile information
          later.
        </>
      ),
      mentor: (
        <>
          <strong>Awesome!</strong> You've completed all the required fields.
          Click the button at the bottom of this page to submit your profile.
          Don't worry, you can always edit and update your profile information
          later.
        </>
      ),
    },
  },
  {
    name: `Await profile approval`,
    message: {
      mentee: (
        <>
          <strong>Thanks for sending us your profile!</strong> We are reviewing
          it and will email you once it's done. After the profile approval,
          you'll be able to find a mentor.
        </>
      ),
      mentor: (
        <>
          <strong>Thanks for sending us your profile!</strong> We're reviewing
          it and will email you once it's done. While you're waiting, pick a
          time for your{' '}
          <a
            href="https://calendly.com/hadeertalentsucess/mentors-onboarding-session?month=2024-02"
            target="__blank"
          >
            onboarding call
          </a>
          . After the call and profile approval, students can apply to be your
          mentee!
        </>
      ),
      corporateMentor: (
        <>
          <strong>Thanks for sending us your profile!</strong> We are reviewing
          it and will email you once it's done. After the profile approval,
          students can apply to be your mentee!
        </>
      ),
    },
  },
  {
    name: `You're all set!`,
    message: {
      mentee: (
        <>
          <strong>Congratulations!</strong> Your profile has been approved. You
          are now ready to{' '}
          <a href="/app/find-a-mentor/" target="_blank" rel="noreferrer">
            find a mentor
          </a>
          . If you have questions, please check our{' '}
          <a href="/faq" target="_blank" rel="noreferrer">
            FAQ
          </a>
          , <a href="mailto:career@redi-school.org">contact us</a> or{' '}
          <a
            href="https://calendly.com/hadeertalentsucess/consultancy-call?month=2024-02"
            target="_blank"
            rel="noreferrer"
          >
            book a call
          </a>{' '}
          with our Mentorship Program Manager.
        </>
      ),
      menteeCyberspace: (
        <>
          <strong>Congratulations!</strong> Your profile has been approved. You
          are now ready to{' '}
          <a href="/app/find-a-mentor/" target="_blank" rel="noreferrer">
            find a mentor
          </a>
          . If you have questions, please check our{' '}
          <a href="/faq" target="_blank" rel="noreferrer">
            FAQ
          </a>
          , <a href="mailto:career@redi-school.org">contact us</a> or{' '}
          <a
            href="https://calendly.com/josefa_cyberspace/redi-connect-consultancy-call-only-for-cyberspace"
            target="_blank"
            rel="noreferrer"
          >
            book a call
          </a>{' '}
          with our Mentorship Program Manager.
        </>
      ),
      mentor: (
        <>
          <strong>Congratulations!</strong> Your profile has been approved.
          Students can now apply to be your mentee. You're all set to make a
          difference as a mentor! Make sure you keep your profile up to date.
        </>
      ),
    },
  },
]
