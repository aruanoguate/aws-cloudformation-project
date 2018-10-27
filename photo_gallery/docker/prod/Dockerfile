# Use the base image for this repo
FROM aruanoguate/landivar_aws_project:photo_gallery_base

# Copy the current directory contents into the image at /main_website
COPY . /main_website

# Generate the uglified files for production distribution
RUN npm run minp

# Marking as a production environment
ENV NODE_ENV production

# Run the application using forever for monitoring
CMD ["forever", "--minUptime", "1000", "--spinSleepTime", "5000", "server.js"]