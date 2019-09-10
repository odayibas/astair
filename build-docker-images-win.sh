#!/bin/bash

# usage;
# bash build-docker-images.sh --docker-registry=astar.azurecr.io --image-version="0.0.1"

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

cd feedback-collector/
docker build -t $docker_registry/astair-feedback-collector:$image_version .
winpty docker login $docker_registry -u astar
docker push $docker_registry/astair-feedback-collector:$image_version

