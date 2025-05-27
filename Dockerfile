FROM node:18.15.0-alpine3.17 as api
WORKDIR /usr/src/app
COPY package.json  ./
RUN yarn install --prod
RUN yarn add vite
RUN npm install serve -g
COPY . .
CMD [ "serve", "-s", "dist" ]