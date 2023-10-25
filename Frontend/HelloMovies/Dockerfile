# Create image based on the official Node image from dockerhub
FROM node:lts-buster AS development

# update packages
# RUN apk update
# Create app directory
WORKDIR /client/app

# create root application folder
WORKDIR /client/app

# copy configs to /app folder
# Copy dependency definitions
COPY Frontend/HelloMovies/package.json /client/app
COPY Frontend/HelloMovies/package-lock.json /client/app



# Install dependecies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm ci  



# copy source code to /app/src folder
COPY Frontend/HelloMovies /client/app

EXPOSE 5173


CMD ["npm","run","dev"]