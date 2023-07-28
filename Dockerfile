FROM node:19.9.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules
RUN npm install
COPY . .

RUN chmod +x start.sh

RUN npx prisma generate

EXPOSE 1234

CMD ["npm", "run", "dev"]