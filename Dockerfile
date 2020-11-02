FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production
RUN npm run build
COPY . .


EXPOSE 3000
CMD [ "npm", "start" ]	
