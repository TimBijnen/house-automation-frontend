FROM node:12

WORKDIR /usr/src

COPY package*.json ./
COPY . /usr/src
RUN npm install --unsafe-perm
RUN npm build


EXPOSE 3000
CMD [ "npm", "start" ]	
