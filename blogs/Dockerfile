# specify the node base image with your desired version node:<version>
# FROM node:12-alpine
FROM node:latest
WORKDIR /server
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 8081
CMD npm start
