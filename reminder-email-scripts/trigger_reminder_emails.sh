#!/bin/bash
# Get the current date in the format YYYY-MM-DD
current_date=$(date +"%Y-%m-%d")

# Load environment variables
if [ -f .secrets ]; then
    export $(cat .secrets | sed 's/#.*//g' | xargs)
fi

# Endpoint URL
MENTORS_COMPLETE_PROFILE_URL="http://localhost:3333/api/reminder-emails/s3cr3t-3ndp01nt-t0-tr1gg3r-r3m1nd3r5/mentors-complete-profile"
MENTEES_COMPLETE_PROFILE_URL="http://localhost:3333/api/reminder-emails/s3cr3t-3ndp01nt-t0-tr1gg3r-r3m1nd3r5/mentees-complete-profile"

MENTEES_APPLY_TO_MENTOR_URL="http://localhost:3333/api/reminder-emails/s3cr3t-3ndp01nt-t0-tr1gg3r-r3m1nd3r5/mentees-apply-to-mentor"

MENTORSHIP_FOLLOW_UP_URL="http://localhost:3333/api/reminder-emails/s3cr3t-3ndp01nt-t0-tr1gg3r-r3m1nd3r5/mentorship-follow-up"

LOGFILE_FILE_PATH="./logs/reminder_emails_$current_date.log"

# Call the endpoint
curl -s -w "\n" -H "Authorization: $DAILY_CRONJOB_SEND_REMINDER_EMAIL_SECRET_TOKEN" $MENTORS_COMPLETE_PROFILE_URL >> $LOGFILE_FILE_PATH
curl -s -w "\n" -H "Authorization: $DAILY_CRONJOB_SEND_REMINDER_EMAIL_SECRET_TOKEN" $MENTEES_COMPLETE_PROFILE_URL >> $LOGFILE_FILE_PATH
curl -s -w "\n" -H "Authorization: $DAILY_CRONJOB_SEND_REMINDER_EMAIL_SECRET_TOKEN" $MENTEES_APPLY_TO_MENTOR_URL >> $LOGFILE_FILE_PATH
curl -s -w "\n" -H "Authorization: $DAILY_CRONJOB_SEND_REMINDER_EMAIL_SECRET_TOKEN" $MENTORSHIP_FOLLOW_UP_URL >> $LOGFILE_FILE_PATH