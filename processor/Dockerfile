FROM ubuntu:18.04

WORKDIR /app
COPY requirements.txt requirements.txt

RUN apt update && apt-get upgrade -y && apt-get autoremove && apt-get autoclean
RUN apt install -y python3-pip git curl tesseract-ocr

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
