FROM node:12

WORKDIR /usr/src

COPY package*.json ./
COPY . /usr/src
RUN yarn install
# RUN npm install --unsafe-perm
RUN yarn build


EXPOSE 3000
CMD [ "yarn", "start" ]	
