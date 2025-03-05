# Use an official Nginx image to serve your HTML, CSS, and JS files
FROM nginx:latest

# Copy your project files into the Nginx HTML directory
COPY . /usr/share/nginx/html

# Expose port 80 to allow traffic
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
