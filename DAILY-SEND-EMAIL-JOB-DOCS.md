# Documentation of daily job to send notification emails to users

This table documents the various notification emails sent to ReDI Connect users as a result of a daily job.

| ID                                               | Recipient       | Condition                                                                                                       |
| ------------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------- |
| mentee-not-sent-application-after-activation     | Mentee          | Mentee user has _not_ sent a mentorship application to a mentor within 7 days after activation                  |
| no-mentoring-session-logged-yet                  | Mentor & mentee | Mentor has _not_ logged a mentorship session with a mentee within 10 days of accepting the mentee's application |
| no-mentoring-session-logged-yet-second           | Mentor & mentee | Mentor has _not_ logged a mentorship session with a mentee within 30 days of accepting the mentee's application |
| mature-mentorship-request-feedback-offer-support | Mentor & mentee | Six weeks (6 \* 7 = 42 days) elapsed in an active mentorship                                                    |
| pending-mentorship-application-reminder          | Mentor          | A mentorship application has been pending for 6 days                                                            |
