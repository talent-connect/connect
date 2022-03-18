FROM node:16.14-alpine3.14 As builder

WORKDIR /app

COPY yarn.lock package.json ./
RUN yarn
COPY . .
RUN yarn nx run nestjs-api:build

FROM node:16.14-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3333
CMD ["node", "dist/apps/nestjs-api/main"]
