# Video Analytics
In this section, the main idea is to count the number of people in the office. We will use an IP to do it. Our model recognizes if a person is passing a line on the monitor and changes this number depending on the direction. User draws a line on the screen according to the position of the door in the camera such as whenever a person is moving up the number of people inside of the office is decreases 1 and whenever a person is moving down that number increases 1.

**Object Detection:**
YOLO was used for object detection (yolov3). That helps us to find 80 different object for a frame, but we just need to know people ones. Thus, we only used person objects in the project. 

**Object Tracking** 
We used PyImageSearch to track an object. PyImageSearch compares the consecutive frames in the camera. Notices that the object is moving and decides it is the same as the previous object.
