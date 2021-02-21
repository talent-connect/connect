# Azure Migration plan 1.0

The components of Talent Connect are:

- database: MongoDB
- redi-connect-backend: Loopback/Express.js-based REST server
- redi-connect-front: frontend coded in React, goes by name "ReDI Connect", in context of this repository's documentation "Talent Connect"
- redi-connect-admin: simple administration panel (based on react-admin)

## Current hosting/deployment infrastructure

The admin panel (redi-connect-admin) and Talent Connect frontend are both hosted in Amazon S3 buckets. In turn, each S3 bucket has a Cloudfront distribution. Each Cloudfront distribution has an equivalent CNAME subdomain record (\*.redi-school.org). All DNS records are administered via Wix. There are a couple dozen other DNS records below redi-school.org.

Whenever an update to the admin panel takes place, a simple command `yarn run deploy-production` is run. This builds a React app; deletes all contents of the S3 bucket connect-admin.redi-school.org; uploads the React app there; runs a CloudFront invalidation.

Whenever an update to the frontend takes place, the equivalent takes place, but with an extra layer: the `yarn run deploy-production` command really run the command `yarn deploy-production:<location>` four times, with `location` looping through `location-picker`, `berlin`, `munich`, and `nrw`. In each build the location name becomes the value of an `REDI_LOCATION` environment variable, that tweaks the build as appropriate. The final output is:

- ReDI Connect "Berlin" deployed to connect.berlin.redi-school.org, for the mentor/mentee community in Berlin
- ReDI Connect "Munich" deployed to connect.munich.redi-school.org, for the mentor/mentee community in Munich
- ReDI Connect "NRW" deployed to connect.nrw.redi-school.org, for North-Rhein Westphalia
- ReDI Connect 'Location Picker' deployed to connect.redi-school.org. A simple landing page with three buttons leading to each of the above three location-specific frontends.

The rationale behind the location split across three locations is mainly to ensure the physical co-location of mentor and mentee in the same city and under the same ReDI School. This has numerous benefits. However, under the current corona situation, the idea of eliminating a location split (or something in-between the status quo and a complete elimination) has come up, and will be considered again by the ReDI Connect product owner Miriam Abu Hamdan in December.

certbot is used along with AWS Certificate Manager to generate and store SSL certificates for all the above addresses. The process is entirely manual, generating new certs every two months or so by running a DNS-based validation.

Three other S3 buckets are noteworthy:

- `redi-connect-db-bkps`: contains mongodb dump files automatically created by cronjob on the backend server
- `redi-connect-email-assets`: various image assets used in transactional emails sent from platform
- `redi-connect-profile-avatars`: contains images mentor/mentee users upload, as avatars in their profiles

Transactional emails are sent using SES, on events such as sign up, email validation, user activation, mentorship request, mentorship session logged, and a few more.

The final two system components, the backend and mongodb, are both hosted on a simple `t2.medium` EC2 server. The "deployment" to these is entirely manual: latest commits are pushed to `develop` or `master`, checked out on server, and server restarted.

The nodejs backend runs a ORM/ACL/REST framework called loopback. This powers all of the data access and user authorization/authentication needs of the frontend and admin panel.

`forever` is a basic CLI tool that runs the loopback server and reboots it on crash.

## Desired hosting/deployment infrastructure on Azure

This is of course more of an open question, but here are some things I have in mind:

- CI/CD pipeline, perhaps powered using Github Actions? This would automatically spin up/down a full `master` environment (split across all "ReDI locations"), `develop` staging environment (also split across all "ReDI locations"), and finally (icing on the cake) an environment for each active feature branch (_perhaps_ also split across all "ReDI locations").
- Database auto-managed (including upgrades and backups) by some cloud service, e.g. MongoDB Atlas
- Automatized SSL certs

We're talking to Microsoft about a sponsorship deal to get Azure credits for free.