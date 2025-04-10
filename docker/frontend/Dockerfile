# Build stage
FROM node:20.17.0 as build
WORKDIR /app
COPY fe/package*.json ./
RUN npm install
COPY fe/ .
# Thêm ARG và ENV để nhận biến môi trường khi build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
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