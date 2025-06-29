FROM node:20 AS build

WORKDIR /MisaServerCoreFE

COPY package*.json ./

ARG HOST
ARG IS_PROD
ARG PORT
ARG MISA_FILES_ENTRY_HOST
ARG MISA_FILES_ENTRY_PORT

ENV HOST=0.0.0.0
ENV IS_PROD=true
ENV PORT=8080
ENV MISA_FILES_ENTRY_HOST=https://misaserver.ru/files/assets
ENV MISA_FILES_ENTRY_PORT=8081

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
