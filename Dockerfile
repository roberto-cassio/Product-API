FROM openjdk:17-jdk-alpine
WORKDIR /product-api
COPY target/product-api-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]