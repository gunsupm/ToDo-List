# ToDo List Application

## Overview
This is a simple ToDo List web application built with **React.js** for the front-end and **Python (Flask)** for the back-end. The application allows users to add, update, and delete tasks with an intuitive and user-friendly interface.

This repository contains the **gh-pages** branch, which hosts the production-ready front-end deployed via GitHub Pages.

## Features
- **Front-End**: Built using React.js, providing a dynamic and responsive user interface.
- **Back-End**: A Flask API for managing tasks (e.g., adding, editing, and deleting tasks).
- **Persistent Data**: Tasks are stored and managed on the back-end server.
- **CRUD Operations**: Users can create, read, update, and delete tasks.

## Technologies Used
- **React.js**: JavaScript library for building the user interface.
- **Python (Flask)**: Framework for the back-end API.
- **GitHub Pages**: Used for hosting the front-end of the application.

## Live Demo
You can access the live demo of the ToDo List app hosted on GitHub Pages here:  
[Live Demo](https://gunsupm.github.io/ToDo/)

## Installation

### Front-End Setup (React.js)
1. Clone the repository:
   ```bash
   git clone https://github.com/gunsupm/ToDo.git
   cd ToDo
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm start

### Back-End Setup (Python Flask)
1. Clone the repository:
   ```bash
   git clone https://github.com/gunsupm/ToDo.git
   cd ToDo/backend
2. Create a virtual environment: 
   ```bash
   python -m venv venv

3. Activate the virtual environment:
- On Window:
   ```bash
  venv\Scripts\activate

- On MacOs/Linux:
   ```bash
  source venv/bin/activate

4. Install required dependencies:
   ```bash
   pip install flask flask-alchemy flask-cors

5. Run Flask application:
  flask run

### Running the Application
Ensure both the front-end and back-end servers are running:

Front-End: http://localhost:3000
Back-End: http://localhost:5000
You can now interact with the ToDo List application by adding, updating, and deleting tasks.

Project Status
Front-End: Complete and deployed on GitHub Pages
Back-End: Complete and functional *Waiting for Deploy


