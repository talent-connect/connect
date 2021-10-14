# Documentation of daily job to send automated reminder emails to ReDI Connect mentors and mentees

This table documents the various notification emails sent to ReDI Connect users as a result of a daily job.

| #   | ID                                              | Recipient       | Condition                                                                                                       |
| --- | ----------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| 1   | mentee-not-sent-application-after-activation    | Mentee          | Mentee user has _not_ sent a mentorship application to a mentor within 7 days after activation                  |
| 2   | no-mentoring-session-logged-yet                 | Mentor & mentee | Mentor has _not_ logged a mentorship session with a mentee within 10 days of accepting the mentee's application |
| 3   | no-mentoring-session-logged-yet-second-reminder | Mentor & mentee | Mentor has _not_ logged a mentorship session with a mentee within 30 days of accepting the mentee's application |
| 4   | mentorship-is-weeks-old-so-request-feedback     | Mentor & mentee | Six weeks (6 \* 7 = 42 days) elapsed in an active mentorship                                                    |
| 5   | pending-mentorship-application-reminder         | Mentor          | A mentorship application has been pending for 6 days                                                            |
| 6   | mentor-not-completed-profile-after-activation   | Mentor          | Mentor has not filled out fields A, B, C, D, E etc. yet within X days of activation                             |
