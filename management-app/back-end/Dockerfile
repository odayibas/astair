# base build image
FROM maven:3.5-jdk-8 as maven

COPY ./pom.xml ./pom.xml

# build all dependencies
RUN mvn dependency:go-offline -B

COPY ./src ./src

# build for release
RUN mvn package

# final base image
FROM openjdk:8u171-jre-alpine

# set deployment directory
WORKDIR /usr/src/app

# copy over the built artifact from the maven image
COPY --from=maven target/*.jar .

# set the startup command to run binary and expose it
EXPOSE 8090

CMD java -jar *.jar
