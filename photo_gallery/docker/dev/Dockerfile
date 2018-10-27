# Use the base image for this repo
FROM aruanoguate/landivar_aws_project:photo_gallery_base

# Marking as a development environment
ENV NODE_ENV development

# All the runtime configurations are provided on launch.sh
COPY docker/dev/launch.sh /cmd/launch.sh
RUN chmod -R +x /cmd
CMD ["sh", "/cmd/launch.sh"]
