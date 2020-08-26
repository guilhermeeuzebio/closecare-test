FROM python:3.6-alpine

ENV PYTHONUNBUFFERED 1

RUN mkdir /webapps

ENV BUILD_PACKAGES linux-headers curl curl-dev \
    ca-certificates gcc postgresql-dev build-base bash postgresql-client

RUN apk add --update --no-cache $BUILD_PACKAGES

RUN pip install -U pip setuptools

COPY requirements.txt /webapps/

RUN pip install -r /webapps/requirements.txt

ADD . /webapps
WORKDIR /webapps

EXPOSE 5000
