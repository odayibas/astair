# Video Analytics
In this section, the main purpose is to count the number of people in the office since room temperature is also dependent on the number of people inside of the room . We will use an IP camera to do the counting. Our model recognizes if a person is passing a line on the monitor, it updates the count according to the direction of that person. The line on the monitor is drawn by the user using web app of ASTAiR depending on the position of the door at the view of camera. Also, our model supports gender detection and counts how many male/female enters or exits office.

**Object Detection:**

OpenCV library and Caffe model was used for object detection. That helps us to find 80 different object for a frame, but we just need to know people ones. Thus, we only used person objects in the project.

**Object Tracking:**

We used PyImageSearch to track an object. This model compares the consecutive frames in the camera. It notices that the object is moving and decides it is the same as the previous object. Directions are determined by using centroids of the people. When these centroid points intersects with the certain lines given by the user, number of male and female and total count of people are updated.

**Gender Detection:**

To detect gender gender_net caffemodel was used. When people enter to or exit from the office number of female and male updated.

**Use case:**

User will be write RTSP address of the IP camera to the web app and draw a line on the screen. Later the program will start counting the number of the people in the room. Returns that value to the database. This value will be used for the modelling and deciding the optimum temperature, fan etc. for air-conditioners. Furthermore, this number will be printed on the screen by web application of ASTAiR.

**Sample usage in terminal**

python people_counter.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt  --model mobilenet_ssd/MobileNetSSD_deploy.caffemodel --input videos/example_01.mp4  --output output/output_01.avi
