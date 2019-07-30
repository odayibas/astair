# Management Application

In this part, ASTAiR web based management app wil be developed. In this web application, admin manages A/C controller settings, views indoor/outdoor weather variables, user feedbacks and result of the votes from  "Slack" chatbot about the workplace's environment. Admin will also be able to analyze the number and gender of people in the workplace through the information taken from the video analytics part of the project.After those analysis are applied to the machine learning models, ASTAiR web app will demonstrate the final temperature and properties of the environment.

Five screens are developed to manage the A/C and monitor the environment. These screens are home, register, login, dashboard A/C Control and form page. Definitons are provided below:

**Home:**  Home screen of the application that contains a youtube video about the project.

**Login:** It is the screen that the administrator or the users will enter the site  with the username and password.

**Register:** It is the screen that the administrator or the users will register as user to the site  with the username and password.

**Dashboard:** It is the screen that the administrator or the users will view information and charts about the current indoor/outdoor weather conditions, people and form results.

**A/C Control:** It is the screen for the administrator to control the A/C setting manually from the web app.

**Form Page:** It is the screen that  users and administrator will give feedback about the current environment as hot, cold or nice. Also, view his/her old feedbacks as a timeline and observe other feedbacks about the environment in a chart. 

To install the frontend application (ASTAiR) you’ll need to have Node >= 8.10 on your machine
First, You can install and start the frontend application with 
- _npm install_
- _npm start_ 

Spring Boot provides all necessary methods. Simply it will provide connection between database and frontend. These methods are visualised by Swagger UI. 

To run backend application (AstairApplication) first you need to run
- _mvn clean install_
- _mvn spring-boot:run_

in management-app/backend. Then you can try and execute all the controllers by using Swagger UI at http://127.0.0.1:8090/swagger-ui.html#

**Technologies**
---
**Frontend**
  - HTML
  - CSS
  - JavaScript
  - React
  
**Backend**
  - Java Spring Boot
  - Maven
  - Swagger UI
