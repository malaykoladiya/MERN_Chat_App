# Real-Time Chat Application

This project is a full-stack web application that provides functionality for user authentication and messaging. Built with Node.js and Express for the backend, it integrates MongoDB for data storage, utilizes WebSocket for real-time communication, and implements JWT for secure authentication. On the frontend, it features a responsive and intuitive user interface built with React, styled with TailwindCSS for a modern look, and leverages Vite for efficient asset bundling and fast reloading, ensuring a seamless user experience. This combination of technologies enables real-time interactions and a dynamic, engaging user interface.


## Features
1. Technologies used: MongoDb, Express, React, Node.js, Socket.io, TailwindCSS, Daisy UI
2. Socket.io for real-time messaging and online user status
3. JWT for authentication


## Setup

To set up the application, follow these steps:

1. Clone the repository to your local machine.
2. Open a terminal window and navigate to the project directory.
3. Create a `.env` file in the project directory and add the following environment variables:

```
MONGO_DB_URI=<your MongoDB connection string>
JWT_SECRET=<a secret string used to sign JWT tokens>
PORT=<the port number that the server should listen on>
```

> **Note:** Ensure that MongoDB is running before you start the application. This can be either a local instance or a cloud-based cluster. For a local instance, make sure MongoDB service is started. For a cloud-based cluster, verify that your `MONGO_DB_URI` in the `.env` file matches your cluster's connection string.


4. Run the following command to install the dependencies and build the application:

```
npm run build
```

5. Run the following command to start the application:

```
npm start
```

## API Documentation

The application has the following endpoints:

* `/auth/signup`: This endpoint is used to create a new user account.
* `/auth/login`: This endpoint is used to log in an existing user.
* `/auth/logout`: This endpoint is used to log out a user.
* `/messages/:id`: This endpoint is used to get all messages between the logged-in user and the user with the specified ID.
* `/messages/send/:id`: This endpoint is used to send a message to the user with the specified ID.
* `/users/`: This endpoint is used to get a list of all users for the sidebar, excluding the logged-in user.

## Code Overview

The codebase is organized into the following directories:

* `backend/controllers`: This directory contains the controller functions for the different endpoints.

* `backend/db`: This directory contains the code to connect to the MongoDB database.

* `backend/middleware`: This directory contains the middleware functions for the different endpoints.

* `backend/models`: This directory contains the mongoose models for the different entities in the application.

* `backend/routes`: This directory contains the routes for the different endpoints.


* `frontend/src/components`: This directory is subdivided into further directories such as `messages` and `sidebar`, each containing React components related to their respective UI segment. For example:
    * `messages`: Includes components for displaying individual messages, the message input area, and the container for the messaging interface.
    * `sidebar`: Contains components for the sidebar area, including individual conversation listings, search functionality, and logout button.

* `frontend/src/context`: Contains React context files like `AuthContext` for managing authentication state and `SocketContext` for WebSocket connections across the application.

* `frontend/src/hooks`: This directory includes custom React hooks that encapsulate reusable logic for various operations such as fetching conversations (`useGetConversations`), handling messages (`useGetMessages`, `useListenMessages`, `useSendMessage`), and managing user authentication (`useLogin`, `useLogout`, `useSignup`).

* `frontend/src/pages`: Contains page components that represent different views in the application, such as the home page, login, and signup screens.

* `frontend/src/utils`: This directory stores utility functions such as `extractTime.js`, which may contain logic for date and time manipulation or other common tasks.

* `frontend/src/zustand`: Holds the state management files using Zustand, a state library for managing application state in a simple and efficient manner.