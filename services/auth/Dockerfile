FROM python:3.8-slim

# install some stuff
RUN apt-get update && \
    apt-get clean

WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# add app
COPY . /usr/src/app

# run server
CMD ["python", "manage.py", "run", "--host=0.0.0.0"]
