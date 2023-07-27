# Stage 1: Build and Install Dependencies
FROM node:14 AS build

WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Build your Node.js app (if necessary)
# RUN npm run build

# Stage 2: Create a lightweight image to run the app
FROM node:14-alpine

WORKDIR /app

# Copy the app and dependencies from the build stage
COPY --from=build /app .

# Expose the port your Node.js app is listening on
EXPOSE 3000

# Start the Node.js app
CMD ["npm", "start"]
