FROM node:14 AS dev
WORKDIR /src
COPY package.json ./
RUN npm install
COPY . .
CMD npm install && exec ./start-dev.sh
