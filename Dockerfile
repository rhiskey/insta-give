FROM node:12-alpine
# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
 
# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/app
 
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# add `/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
 
# Installs all node packages
RUN npm install
#RUN npm install react-scripts@3.4.1 -g --silent
 
# Copies everything over to Docker environment
COPY . /usr/src/app/
 
# Uses port which is used by the actual application
EXPOSE 3000
 
# Finally runs the application
CMD [ "npm", "start" ]