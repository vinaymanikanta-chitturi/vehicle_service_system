# Delivery Management System

## Overview
This is a full-stack web application for a Vehicle Service System. It allows users to register vehicle components, add repair vehicles, report issues, and calculate total costs.

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (for the frontend)
- [Python](https://www.python.org/downloads/) (for the backend)
- [pip](https://pip.pypa.io/en/stable/) (Python package manager)

### Clone the Repository
```bash
git clone https://github.com/vinaymanikanta-chitturi/vehicle_service_system.git
cd vehicle_service_system
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Run database migrations:
   ```bash
   python manage.py migrate
   ```
4. (Optional) Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```
5. Run the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the required packages:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

## Database
All data is stored in `db.sqlite3`, which can be found in the `backend` folder.

## Usage
- Once both the backend and frontend are running, you can access the application by navigating to `http://localhost:3000` in your web browser.