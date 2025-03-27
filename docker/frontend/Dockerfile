# Build stage
FROM node:20.17.0 as build
WORKDIR /app
COPY fe/package*.json ./
RUN npm install
COPY fe/ .
RUN npm run build

# Production stage
FROM nginx:1.23.3
# Copy custom nginx config từ thư mục fe
COPY fe/nginx.conf /etc/nginx/conf.d/default.conf
# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

# Make port 80 available
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
