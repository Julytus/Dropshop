# Build stage
FROM node:20.17.0 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.23.3
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

# Make port 80 available
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

