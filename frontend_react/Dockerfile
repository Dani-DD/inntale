# INSTALLING NODEJS
FROM node

# INSTALLING PROJECT DEPENDENCIES
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install


# APPLYING PERMISSION TO RUN WAIT-FOR-IT.SH
COPY wait-for-it.sh /usr/local/bin/
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# COPY ALL THE OTHER PROJECT FILES INTO THE IMAGE'S WORKING DIRECTORY
COPY . .

# RUN THE SERVER
EXPOSE 5173