# Django API Subscription App 🚀

## Overview
This project is a Django-based API Subscription application that allows administrators to manage subscription plans and users to purchase and utilize these plans. It includes features for managing subscriptions, monitoring API usage, and providing a user-friendly interface for subscribers.

---

## Features

### Admin Module 🛠️
- **Subscription Plan Management**  
  📝 Add, update, and delete subscription plans.  
  📊 View all subscription plans in a table with filtering options such as pagination, search, and dropdown filters.

- **Plan Duration Management ⏳**  
  🆕 Add, update, and delete plan durations with titles and the number of days.

- **Subscriber Management 👥**  
  🔍 View subscribers with active and expired subscriptions, along with filtering options.

- **API Call Monitoring 📈**  
  📝 View API call logs including:  
  - 🔗 API endpoint  
  - 📦 Request body  
  - 📬 Response body  
  - 📊 Status code  
  - 📅 Date of the request  
  - 📄 Download reports in PDF format with all necessary fields and filtering options.

---

### User Module 👤
- **Subscription Purchase 💳**  
  Users can purchase a subscription plan with validation.  
  📉 Monitor remaining requests based on the purchased plan, with per-request charges applied after expiration.

- **API Interaction 🌐**  
  Users can call APIs by entering the endpoint and view responses in JSON format. Responses can be easily copied.

- **Profile Management 🛡️**  
  Users can update their profiles.

---

## Installation 🛠️

### Step 1: Create Database
   Set up a PostgresSQL database for your project.

### Step 2: Integrate Necessary Details

   - Create a SQL function which is in `postgresfunctions.txt` and execute it in pgAdmin4.  
   - Add necessary client-id and secret for Google login.

### Step 3: Clone the Repository  

   ```bash
   git clone <repository-url>
   cd django-subscription-app
   ```


### Step 4: Create a Virtual Environment
   To avoid conflicts with global Python packages, create a virtual environment for your project.

```bash
  python3 -m venv venv
```
Activate the virtual environment:

On Windows:

```bash
  venv\Scripts\activate
```

On macOS/Linux:

```bash
  source venv/bin/activate
```

### Step 5: Install Requirements

Install the required Python libraries listed in the requirements.txt file.

```bash
  pip install -r requirements.txt
```

### Step 6: Create .env File

Create a .env file in the root directory of the project. The .env file should contain your secrets like API keys. Here's the structure for the .env file

```bash
  SECRET_KEY = "YOUR SECRET KEY"
  EMAIL_HOST = "YOUR EMAIL HOST"
  EMAIL_PORT = EMAIL PORT NO
  EMAIL_HOST_USER = "YOUR EMAIL HOST USER"
  EMAIL_HOST_PASSWORD = "YOUR EMAIL HOST PASSWORD"
  GOOGLE_CLIENT_ID = "YOUR GOOGLE CLIENT ID"
  GOOGLE_CLIENT_SECRETS =  "YOUR GOOGLE CLIENT SECRETS"
  DB_NAME =  "YOUR DB NAME"
  DB_USER = "YOUR DB USER NAME"
  DB_PASSWORD = "YOUR DB PASSWORD"
  DB_PORT = "YOUR DB PORT"
  DB_HOST = "YOUR DB HOST"
``` 

### Step 7: Run the Application

Start the Django application:

```bash
    python manage.py runserver
```

The application will be available at http://127.0.0.1:8000/.

Note : For Admin Login You can add the User Using DB or Update any Register user in user_type in user_master User to Admin and after Login that Account as Admin.
