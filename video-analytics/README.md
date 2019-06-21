# Video Analytics
In this section, the main idea is to count the number of people in the office since room temperature is also dependent on the number of people inside of the room . We will use an IP camera to do it. Our model recognizes if a person is passing a line on the monitor and changes this number depending on the direction. User draws a line on the screen according to the position of the door in the camera by using web app of ASTAiR, whenever a person is moving up the number of people inside of the office is decreases 1 and whenever a person is moving down that number increases 1.
**Object Detection:**
OpenCV library and Caffe model was used for object detection. That helps us to find 80 different object for a frame, but we just need to know people ones. Thus, we only used person objects in the project.
**Object Tracking**
We used PyImageSearch to track an object. PyImageSearch compares the consecutive frames in the camera. Notices that the object is moving and decides it is the same as the previous object.
**Usage**
User will be write RTSP address of the IP camera to the web app and draw a line on the screen. Later the program will start counting the number of the people in the room. Returns that value to the database. This value will be used for the modelling and deciding the optimum temperature, fan etc. for air-conditioners. Furthermore, this number will be printed on the screen by web app.
