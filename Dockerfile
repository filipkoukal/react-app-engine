# Build stage for the frontend
FROM node:20-alpine as build

WORKDIR /app

# Copy app files
ADD . /app

# Set environment variable for API route
ARG VITE_API_ROUTE
ENV VITE_API_ROUTE=$VITE_API_ROUTE

# Copy environment example and install dependencies
RUN cp .env.example .env
RUN npm ci --legacy-peer-deps

# Build the frontend
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy the build output to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy db.json for json-server to use
COPY db.json /app/db.json

# Install json-server to run backend
RUN apk add --no-cache nodejs npm
WORKDIR /app
COPY --from=build /app /app
RUN npm install -g json-server

# Expose 
EXPOSE 8080

# Run json-server on port 3000 and Nginx on 8080
CMD ["sh", "-c", "json-server /app/db.json --port 3000 & nginx -g 'daemon off;'"]
