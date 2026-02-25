FROM node:20.10.0-alpine3.19 AS builder

WORKDIR /app

COPY . /app

# Combine nginx server with static frontend files
FROM nginx:1.25.1-alpine AS final

# Copy the built frontend files to Nginx directory
COPY --from=builder /app/packages/app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY --from=builder /app/infras/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80