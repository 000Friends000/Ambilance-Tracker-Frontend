# Stage 1: Build the Angular application
FROM node:20-alpine as builder

# Add necessary build tools
RUN apk add --no-cache python3 make g++

# Set Node options for memory management
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with clean npm cache
RUN npm cache clean --force && \
    npm ci --no-audit --no-fund

# Copy the rest of the application
COPY . .

# Build the application with production configuration
RUN npm run build -- --configuration production --output-hashing all

# Stage 2: Serve the application using nginx
FROM nginx:alpine

# Add bash for script support
RUN apk add --no-cache bash

# Create directory for environment script
RUN mkdir -p /usr/share/nginx/html/assets/env/

# Copy the built application from builder stage
COPY --from=builder /app/dist/app/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy environment script
COPY env.sh /docker-entrypoint.d/40-env-config.sh
RUN chmod +x /docker-entrypoint.d/40-env-config.sh

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
