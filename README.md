# Browsemind

Browsemind is a browser extension and Django backend project that tracks your browsing habits and visualizes how much of your time is spent in different website categories. It helps you understand your online behavior by showing the percentage of your time spent on categories such as news, social media, communication, entertainment, education, shopping, and more.

## Features
- Tracks time spent on each website and categorizes your browsing.
- Visualizes your browsing data with interactive charts.
- Lets you filter and analyze your browsing by date range and category.
- All data is processed securely.
- Website categorization is powered by Llama 4, an advanced language model for accurate classification.

## Categories
The project uses a set of predefined categories, including:
- news, social media, communication, entertainment, education, shopping, finance, technology, health, travel, government, legal, adult, religion, politics, career, real estate, automotive, food, lifestyle, sports, science, web services, email, illegal

## Installation

### 1. Clone the repository
```
git clone https://github.com/Soroush98/BrowseMind.git
cd browsemind
```

### 2. Set up the Python backend
- Go to Backend directory:
 ```
  cd Backend
  ```
- Create a virtual environment:
  ```
  python -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
  ```
- Install requirements:
  ```
  pip install -r requirements.txt
  ```

### 3. Configure environment variables
- Set up your AWS/DynamoDB credentials and any other required environment variables.

### 4. Run database migrations
```
python manage.py migrate
```

### 5. Start the Django server
```
python manage.py runserver
```

### 6. Start the Huey task consumer (for background processing)
```
python manage.py run_huey
```

### 7. Load the extension in your browser
- Go to your browser's extensions page.
- Enable Developer Mode.
- Load the `Extension` folder as an unpacked extension.

## Requirements
See `requirements.txt` for the full list of Python dependencies.

## Notes
- The extension uses JWT for authentication and stores your browsing data securely.
- All time calculations and storage are done in UTC for consistency.
- For development, you can use SQLite for Huey background tasks, or switch to Redis for production.

---

Enjoy understanding your browsing habits with Browsemind!
