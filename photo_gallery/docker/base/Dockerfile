# Use an official NodeJS image
FROM node:10.8.0-alpine

# Install forever module as a global program on the image
RUN npm config set unsafe-perm true && \
    npm install forever@0.15.3 -g

# Copy the package.json and install the local dependencies,
# this should be done this way to cache dependencies independently 
# of other changes in the code
COPY package.json /main_website/package.json
WORKDIR /main_website
RUN npm install

# Make port 5000 available to the world outside this image
EXPOSE 5000
