#!/bin/bash

# usage;
# bash build-docker-images.sh --docker-registry=astar.azurecr.io --version="0.0.1"

set -e

for i in "$@"
do
case $i in
    --docker-registry=*)
    docker_registry="${i#*=}"
    ;;
    --image-version=*)
    image_version="${i#*=}"
    ;;
    *)
    ;;
esac
done

services=(
    "back-end:$image_version"
    "frontend:$image_version"
)

cd feedback-collector/
docker build -t $docker_registry/astair-feedback-collector:$image_version .
docker login $docker_registry
docker push $docker_registry/astair-feedback-collector:$image_version

cd ../
cd management-app/

for attribute in "${services[@]}"
do
    directory="${attribute%%:*}"
    image_version="${attribute##*:}"
    cd $directory

    echo "Building the $directory docker image..."
    docker build -t $docker_registry/astair-management-app-$directory:$image_version .

    echo "Pushing the $directory docker image..."
    docker push $docker_registry/astair-management-app-$directory:$image_version
    cd ..
done
