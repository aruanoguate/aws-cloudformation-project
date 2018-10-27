# Manipulate the docker images
buildBase:
	docker build --rm -f docker/base/Dockerfile -t aruanoguate/landivar_aws_project:photo_gallery_base .
build: buildBase
	docker build --rm -f docker/dev/Dockerfile -t aruanoguate/landivar_aws_project:photo_gallery_dev .
buildProd: buildBase
	docker build --rm -f docker/prod/Dockerfile -t aruanoguate/landivar_aws_project:photo_gallery .
push: buildProd build
	docker push aruanoguate/landivar_aws_project:photo_gallery_base
	docker push aruanoguate/landivar_aws_project:photo_gallery
	docker push aruanoguate/landivar_aws_project:photo_gallery_dev

# Manipulate the docker containers
up:
	docker-compose -f docker/dev/docker-compose.yml up -d
upProd:
	docker-compose -f docker/prod/docker-compose.yml up -d
down:
	docker-compose -f docker/dev/docker-compose.yml down
downProd:
	docker-compose -f docker/prod/docker-compose.yml down