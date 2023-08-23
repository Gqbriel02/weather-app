# Fetching the latest node image on apline linux
FROM node:alpine AS builder

# Setting up the work directory
WORKDIR /app


# Installing dependencies
COPY ./package.json ./
RUN npm install -g @angular/cli
RUN npm install -g lite-server
RUN npm install


# Copying all the files in our project
COPY . .

RUN ng build

# Exposing port 3000
EXPOSE 3000

# Running our app
CMD ["lite-server"]
