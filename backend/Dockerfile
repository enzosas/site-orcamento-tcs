FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
RUN apt-get install maven -y

WORKDIR /app
COPY . .

RUN mvn clean install -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT [ "java", "-jar", "app.jar" ]