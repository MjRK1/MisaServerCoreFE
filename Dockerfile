FROM node:20 AS build

WORKDIR /MisaServerCoreFE

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
