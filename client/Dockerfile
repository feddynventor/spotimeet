FROM node:latest AS builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps && npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build/ .
COPY react-router.conf /etc/nginx/nginx.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
