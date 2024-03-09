FROM node:16.14-alpine

WORKDIR /CT_backclientmanagement

COPY package* .

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]

