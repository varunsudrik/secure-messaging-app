# Highly Scalable Real-Time Chat Application

This repository contains the source code for a highly scalable real-time chat application built using Node.js, Express.js, Socket.IO, Redis, Prisma, RabbitMQ, bcrypt, cookie for session management, express-rate-limit for rate limiting, and encrypted message storage.

## Features

- Real-time messaging: Users can send and receive messages, including images, in real-time.
- Encrypted message storage: Messages are stored encrypted for enhanced security.
- Highly scalable: The application architecture is designed for horizontal scaling to handle a large number of concurrent users and messages.
- Message persistence: Messages are stored in a database for future retrieval.
- User-friendly interface: Simple and intuitive interface for a seamless chatting experience.
- Session management: User sessions are managed using cookies.
- Rate limiting: Prevents abuse by limiting the number of requests a user can make to the server within a specified time period.

## Technologies Used

- Node.js: A JavaScript runtime environment for building server-side applications.
- Express.js: A minimal and flexible Node.js web application framework.
- Socket.IO: A library that enables real-time, bidirectional, and event-based communication between web clients and servers.
- Redis: An in-memory data structure store used as a database, cache, and message broker.
- Prisma: A modern database toolkit for Node.js.
- RabbitMQ: A message broker that enables asynchronous messaging between services.
- Bcrypt: A library for hashing passwords.
- Cookie: Middleware for managing HTTP cookies.
- express-rate-limit: Middleware for rate limiting HTTP requests.

## Installation

1.  Clone the repository:

bashCopy code

`git clone https://github.com/varunsudrik/secure-messaging-app.git`

Install dependencies:

Frontend :-

- `cd client`
- `npm install`
- `npm run dev`

Set up environment variables:

Create a `.env` file in the /client directory and add the following environment variable:

`VITE_API_URL=http://api-url:port`

Backend :-

- `cd server`
- `npm install`
- `npm run dev`

  Set up environment variables:

Create a `.env` file in the /server directory and add the following environment variables:

`PORT=3000
REDIS_HOST="your_redis_host"
REDIS_PORT=your_redis_port
Redis_User="your_redis_user"
Redis_Pass="your_redis_pass"
PORT=API_Port
DATABASE_URL="your_database_url"
RABBITMQ_URL="your_rabbitmq_url"
React_URL="your_fr"
JWT_Token=your_session_secret
`

Run the application:

`npm run dev`

## Usage

Once the application is running, users can access the chat interface through their web browsers. They can send and receive messages, including images, in real-time.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss the proposed changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
