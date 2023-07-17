FROM node:19.9.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules
RUN npm install
COPY . .
EXPOSE 1234

CMD ["./start.sh" ]