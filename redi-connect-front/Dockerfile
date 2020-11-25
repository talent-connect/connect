FROM node:10 AS dev
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn
COPY src/ src/
CMD yarn && exec yarn start:$REDI_LOCATION

FROM dev AS build
RUN yarn build

FROM nginx AS prod
COPY --from=build /src/build/ /usr/share/nginx/html/
