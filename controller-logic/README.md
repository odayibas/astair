**Rule Based Models**
---
In this chapter, we will create rule based models for ASTAiR project. These models will dynamically change the A/C degree, according to the parameters that it receives from the work place and user feedbacks. In this way, we aim that thermal comfort will be provided in the work places in a democratic way. We will create two models. These models are "Vote Based Model" and "Predicted Mean Vote (PMV)".

**Vote Based Model**
---
This model is based on the results of voting at slack. These voting results will be accessed from the database. The percentage of data received from the database is calculated and received A/C degree and the optimum degree of air conditioning is calculated according to a particular algorithm.

This model created specially for one questionnaire. This question below:
- "How is the temperature inside?" (Multiple Choice Answers: Hot/Good/Cold)

**Input Parameters:**

- Number of "Hot" Vote
- Number of "Good" Vote
- Number of "Cold" Vote
- Instant A/C Degree

**Output Parameters:**

- A/C Degree

**Degree Scale**

This model calculates which option gets the most votes. For instance, it got the most votes "Hot". We created some rules and scales. We decide degree by looking at the vote rate and these conditions. These conditions below that:

- When all votes are the same rate that when hot and cold vote rate are equal or good vote rate is greater than these, A/C degree no change. If good vote rate is not equal these votes and is not greater than these, degree increase/decrease 1 Celsius.
- Cold and good vote rate are equal. Hot vote rate are greater than these, degree decrease 1 Celsius. Otherwise, degree increase 1 Celsius.
- Hot and good vote rate are equal. Hot vote rate are greater than these, degree decrease 1 Celsius. Otherwise, degree increase 1 Celsius.
- Other cases are we follows the these scale:

(HOT)

+4 -> %90

+3 -> %60

+2 -> %40

(+1) <-> (0) <-> (-1)

-2 -> %40

-3 -> %60

-4 -> %90

(COLD)

**Note 1:** (+1), (0) and (-1) values are valid for other three conditions. Thus, these values have no vote rate.

**Note 2:** A/C has some degree ranges. For instance, we have A/C degree ranges: 16 - 30 Celsius, so if system goes beyond these ranges, fixed to the lowest or highest value.

**Predicted Mean Vote (PMV)**
---
The PMV is an index that predicts the mean value of the votes of a large group of persons on the 7-point thermal sensation scale, based on the heat balance of the human body. 

The PPD is an index that establishes a quantitative prediction of the percentage of thermally dissatisfied people who feel too cool or too warm. 

The PMV and PPD are ISO 7730 standard.

**Input Parameters:**

- Air Temperature (Celsius)
- Mean Radiant Temperature (Celsius)
- Relative Air Velocity (m/s)
- Relative Humidity (%)
- Metabolic Rate (met) 
- Clothing (clo)
- External Work (Generally 0)

**Output Parameters:**

- PMV Values
- PPD Values
- A/C Degree

**How to install?**

We will create docker image. When you work this code, you should install docker on personal computer. After installing, you must write the following codes to the console:

- docker build -t models . 
- docker run models

**References**
---
[1] [ISO 7730 Documents](http://www.asandanismanlik.com/wp-content/uploads/2016/12/katalogs-1343-DD.24-TS_EN_ISO_7730.pdf) 
