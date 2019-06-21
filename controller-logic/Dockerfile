FROM python:3

ADD pmvModel.py .
ADD voteBasedModel.py .
ADD modelDecision.py .
ADD start.py .

RUN pip3 install schedule

CMD ["python", "./start.py"]
