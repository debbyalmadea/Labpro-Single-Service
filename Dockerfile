FROM node:19.9.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules
RUN npm install
COPY . .

RUN npx prisma generate
RUN npx prisma migrate dev --name init

RUN npm run build

EXPOSE 1234

CMD ["npm", "run", "start"]