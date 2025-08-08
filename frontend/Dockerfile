# Production Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies for build tools
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment for production build
ENV NODE_ENV=production
ENV VITE_MODE=production

# Build the application
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["serve", "-s", "dist", "-l", "8080"]
