
FROM python:3.7-alpine

WORKDIR /feedback-collector
COPY requirements.txt /feedback-collector

RUN apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
    apk add --no-cache libffi-dev build-base && \
    pip install --upgrade pip && pip install -r requirements.txt --no-cache-dir && \
    apk --purge del .build-deps

COPY app.py /feedback-collector
COPY databaseOperations.py /feedback-collector
COPY slackMessages.py /feedback-collector

EXPOSE 5000

CMD python app.py
