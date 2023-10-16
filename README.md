# HelloMovies
Welcome to my Django-MySQL-React web application! The project's primary aim is to provide an intuitive platform for movie enthusiasts to explore and discover their favorite films. Leveraging the power of Django, MySQL, and React, I crafted a seamless and enjoyable user experience for movie searching and viewing. 🌐🔍🍿


## Prerequisites
***
[Detailed Solution here](./solutionDetails.md)

Before you get started, ensure you have met the following requirements: 📋✅

- Python, Node.js, Docker
- Knowlegde of React, Typescript, Python, Cypress , Unit Testing, E2E cypress.
- I already have a MySQL database set up in the cloud with existing movie data. In your Django project, create an .env file at the root and paste the provided environment variables into this file.

## Getting Started 🏇
***
To get your project up and running, follow these steps:

###  Clone the Repository 🖨️
***
```bash
git clone https://github.com/oreoluwadnd/HelloMovie
cd HelloMovie
```

### Set Up Backend 💼 (Django)
***
```bash
cd Backend/
python -m venv venv # Create a virtual environment
source venv/bin/activate  # On Windows, use venv\Scripts\activate  
cd helloMovies/ 
pip install -r requirements.txt # Install required packages
python manage.py migrate  # Skip
python manage.py runserver # Run the server
```


### Set Up Frontend 💅🏿(React)

***
If you be using this method you will have to change the url in Home.tsx and Details.tsx
API_URL = `"http://0.0.0.0:8000/"`  ---> `http://127.0.0.1:8000/`
```bash
cd Frontend/HelloMovies/
npm install # Install Pakages
npm run dev # start development
``` 

###   Using Docker 📦
***
a. 🏗️Build the django image 
To run the Django container individually, you need update the Dockerfile
`COPY Backend/helloMovies/requirements.txt /app` -> `COPY /requirements.txt /app`
`COPY Backend/helloMovies .` -> `COPY . .`

```bash
cd Backend/helloMovies
docker build -t <image-name> . # Build Image
docker run -p 8000:8000 <image-name> # Run the instance
```

b. 🏗️Build and Run Docker Containers
To run the Django container individually, you need update the Dockerfile
`COPY Frontend/HelloMovies/package.json /client/app`-> `COPY package.json /client/app`
`COPY Frontend/HelloMovies/package-lock.json /client/app`-> `COPY package-lock.json /client/app`
`COPY Frontend/HelloMovies /client/app `-> `COPY . /client/app`
```bash
cd Frontend/HelloMovies
docker build -t <image-name> . # Build Image
docker run -p 5173:5173 <image-name> 
```



###   Using Docker Compose
***
a. 🏗️ Build and Run Docker Containers
```bash
docker compose up
```


### For Django (Back-End Testing)
***
You can run tests for the Django back-end using the following commands🧪🧑‍🔬💼
```bash
cd /path/to/django/project
python manage.py test
```

### For React (Front-End Testing)
***
You can run tests for the Django back-end using the following commands🧪🧑‍🔬💅🏿
```bash
cd /path/to/react/app
npm test
```

### For Cypress (E2E TESTING)
***
You can run tests for the Django back-end using the following commands 🧪🧑‍🔬
```bash
cd Frontend/HelloMovies
npx cypress open
```


