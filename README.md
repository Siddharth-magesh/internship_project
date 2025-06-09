# React Login Application with MySQL Authentication

This project is a **React** frontend with a **Node.js Express** backend that implements a secure user login system using **MySQL** for user data storage. Passwords are hashed with **bcrypt**, and user sessions are managed using browser **localStorage**. The UI uses **Bootstrap 5** for a modern, professional look.

---

## Features

- Secure user login with hashed passwords
- MySQL database integration
- React frontend with Bootstrap 5 styling
- LocalStorage session management
- Clear login success/error messages

---

## Technologies Used

- React.js, Bootstrap 5, Axios, React Router (frontend)
- Node.js, Express, MySQL, bcrypt (backend)

---

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

---

### 2. Set Up MySQL Database

If you don't have MySQL installed:

* **Windows:** Download from [https://dev.mysql.com/downloads/windows/installer/](https://dev.mysql.com/downloads/windows/installer/)
* **macOS:** Use [Homebrew](https://brew.sh/): `brew install mysql`
* **Linux:** Use your package manager, e.g., `sudo apt install mysql-server`

Start MySQL server if not running:

```bash
# Linux/macOS example
sudo service mysql start
```

Login to MySQL:

```bash
mysql -u root -p
```

Create a database and user for the app:

```sql
CREATE DATABASE login_app;
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON login_app.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Create the `users` table:

```bash
mysql -u appuser -p login_app
```

Inside the MySQL prompt:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
EXIT;
```

---

### 3. Backend Setup

Navigate to backend folder (if your repo structure has backend/ folder):

```bash
cd backend
```

Install Node.js dependencies:

```bash
npm install express mysql2 bcrypt cors
```

Create a `.env` file or configure your database connection in `database.js` like:

```js
module.exports = {
  host: 'localhost',
  user: 'appuser',
  password: 'strong_password',
  database: 'login_app',
};
```

Start backend server:

```bash
node server.js
```

The backend will be running at: `http://localhost:5000`

---

### 4. Frontend Setup

In a new terminal window, navigate to the frontend folder (e.g., `src` or root depending on your setup):

```bash
cd src
```

Install frontend dependencies:

```bash
npm install react react-dom react-router-dom axios bootstrap
```

Start the React development server:

```bash
npm start
```

Open your browser and go to:

```
http://localhost:3000
```

---

### 5. Using the Application

* Use the login form to authenticate using existing MySQL users.
* On successful login, the user ID is saved in browser localStorage.
* You will be redirected to the profile page (make sure it's implemented).
* For testing, you can manually insert users in MySQL with hashed passwords (using bcrypt).

---

## Additional Notes

* **Password hashing:** Use bcrypt to hash passwords before inserting users.
* **API URL:** The frontend login form posts to `http://localhost:5000/api/login`. Change if backend URL changes.
* **Session:** Only `userId` is stored in localStorage. For production, consider JWT or secure cookie sessions.
* **Security:** Never expose sensitive credentials or config files publicly.

---

## Future Improvements

* Add user registration and password reset.
* Implement logout and JWT authentication.
* Improve UI and add client-side form validation.
* Write tests for backend and frontend.

---

## License

MIT License

---

## Author

Your Name — [your.email@example.com](mailto:your.email@example.com)

---

