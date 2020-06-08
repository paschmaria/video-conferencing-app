# Video Conferencing App

An app for online court sessions using OpenTok

## Getting started

These instructions will help get a copy of this project up and running on your local machine in no time.

### Prerequisites

What you will need you will need to run this app successfully:
```
Python 3.7.x

Django 3.0.x

PostgreSQL 12.2
```

You can get Python [here](https://www.python.org/downloads/release/python-370/) and PostgreSQL [here](https://www.postgresql.org/download/)

### Installation

You can install and setup this project locally using the following steps:

Download the app from the GitHub Repo
```
$ git clone https://github.com/paschmaria/video-conferencing-app.git

$ cd video-conferencing-app
```

Setup a virtual environment

I'll recommend using [virtualenv](http://www.virtualenv.org/en/latest/).
```
$ virtualenv venv

$ source venv/bin/activate
```

Create a `.env` file and update the following
```
TOK_BOX_API_KEY=YOUR_OPENTOK_API_KEY

TOK_BOX_API_SECRET=YOUR_OPENTOK_API_SETTINGS
```

Next, install the dependencies using [pip](http://www.pip-installer.org/en/latest/), from the
current directory:
```
(venv) $ pip install -r requirements.txt
```

Update DB and run application server
```
(venv) $ python manage.py migrate

(venv) $ python manage.py runserver
```