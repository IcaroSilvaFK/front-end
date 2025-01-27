FROM node:22.4 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN cp .env.example .env

RUN npm run build --prod

EXPOSE 3000

CMD ["npm", "start"]
