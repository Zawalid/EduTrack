FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install --omit=dev

COPY . .


CMD ["npm", "start"]
