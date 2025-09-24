FROM openjdk:21

WORKDIR /app

COPY PROGIGS/target/PROGIGS-0.0.1-SNAPSHOT.jar /app/Progigs.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "Progigs.jar"]