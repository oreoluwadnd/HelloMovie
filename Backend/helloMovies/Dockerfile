# base image  
FROM python:3.8   
# create root application folder
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY Backend/helloMovies/requirements.txt /app
# copy source code to /app/src folder
RUN pip install --no-cache-dir -r requirements.txt
COPY Backend/helloMovies . 
# set environment variables  
# copy whole project to your docker home directory. 
RUN ls -a 
# run this command to install all dependencies  

RUN export DJANGO_DB_TEST=false


# port where the Django app runs  
EXPOSE 8000  
# start server  

CMD python manage.py runserver 0.0.0.0:8000
