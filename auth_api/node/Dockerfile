FROM node:18.13.0-alpine3.17

RUN apk update && apk add openssl1.1-compat

WORKDIR /app
COPY package.json ./

COPY . ./

RUN yarn install
RUN yarn build
RUN npx prisma version

EXPOSE 8000

CMD ["yarn", "dev"]
