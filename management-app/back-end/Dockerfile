# base build image
FROM maven:3.5-jdk-8 as maven

RUN mkdir /root/.m2
ENV SETTING PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHNldHRpbmdzIHhtbG5zPSJodHRwOi8vbWF2ZW4uYXBhY2hlLm9yZy9TRVRUSU5HUy8xLjAuMCIgCiAgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeHNpOnNjaGVtYUxvY2F0aW9uPSJodHRwOi8vbWF2ZW4uYXBhY2hlLm9yZy9TRVRUSU5HUy8xLjAuMCBodHRwOi8vbWF2ZW4uYXBhY2hlLm9yZy94c2Qvc2V0dGluZ3MtMS4wLjAueHNkIj4KICA8bWlycm9ycz4KICAgIDxtaXJyb3I+CiAgICAgIDxpZD5jZW50cmFsPC9pZD4KICAgICAgPG5hbWU+Y2VudHJhbDwvbmFtZT4KICAgICAgPHVybD5odHRwOi8vMTAuMTU0LjQuMzY6MzAwMTIvcmVwb3NpdG9yeS9hc3Rhci1tYXZlbi1ncm91cC88L3VybD4KICAgICAgPG1pcnJvck9mPio8L21pcnJvck9mPgogICAgPC9taXJyb3I+CiAgPC9taXJyb3JzPgo8L3NldHRpbmdzPgoK
RUN echo ${SETTING} | base64 -d > /root/.m2/settings.xml
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

# expose the port
EXPOSE ${SERVER_PORT}

# set the startup command
CMD java ${JAVA_OPTS} -jar *.jar
