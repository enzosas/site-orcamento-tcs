FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install

FROM eclipse-temurin:17-jre

EXPOSE 8081

COPY --from=build /target/app.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]