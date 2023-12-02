# Use the official Node.js 14 image as the base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose port 3000 for the app to listen on
EXPOSE 3030

# Set the command to run when the container starts
CMD ["npm", "start"]