FROM node:boron

# Installation:
# Import MongoDB public GPG key AND create a MongoDB list file
#RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
#RUN apt-get install -y --no-install-recommends software-properties-common
#RUN echo "deb http://repo.mongodb.org/apt/ubuntu $(cat /etc/lsb-release | grep DISTRIB_CODENAME | cut -d= -f2)/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Update apt-get sources AND install MongoDB
RUN apt-get update && apt-get install -y mongodb

# Install netcat
RUN apt-get install -y netcat

# Expose port 27017 from the container to the host
#EXPOSE 27017

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

# Set usr/bin/mongod as the dockerized entry-point application
#ENTRYPOINT ["/usr/bin/mongod"]
#CMD /etc/init.d/mongod start

CMD /etc/init.d/mongodb start | while ! nc -z 127.0.0.1 27017; do sleep 5; done | node server.js 

#CMD sleep 60

#CMD [ "npm", "start" ]
#CMD node server.js
