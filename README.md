# Task Tracker

Task Tracker is a full-stack application for managing tasks. It includes user authentication and task management features. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React, TypeScript, and Vite.

## Features

- User registration and login
- JWT-based authentication
- Task creation, update, deletion, and completion
- Task filtering and sorting

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/gabrielcesar-dev/task-tracker.git
    cd task-tracker
    ```

2. Install backend dependencies:

    ```sh
    npm install
    ```

3. Install frontend dependencies:

    ```sh
    cd frontend
    npm install
    cd ..
    ```

4. Create a `.env` file in the root directory and add the following environment variables:

    ```plaintext
    MONGO_URL=your_mongodb_connection_string
    PORT=your_port_number
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. Start both the backend and frontend servers:

    ```sh
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:5173`.

## License

This project is licensed under the MIT License.
