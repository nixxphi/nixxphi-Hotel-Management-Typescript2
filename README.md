# Hotel Management 2: Typescript
###### Hotels... again.
---

# Hotel Rooms Management System

This project is a Hotel Rooms Management System built with Typescript, Express.js, and MongoDB. It provides a backend API for managing rooms and room types in a hotel.

## Features

- Create, read, update, and delete (CRUD) operations for rooms and room types
- Fetch rooms with optional filters (search, room type, price range)
- Error handling middleware for handling server errors gracefully
- Environment configuration using dotenv for managing environment variables
- Integration with MongoDB database, express and Pino logger.
- Testing with Mocha, Supertest and Chai Sinon. I know, it was annoying af.

## Installation

1. Clone the repository:
   ```bash
   git clone 
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. The dotenv file includes the following
   - PORT=<your port>
   - MONGODB_URI=<your mongo uri>
   - JWT_SECRET=<your jwt secret>
4. Start the server in development mode:
   ```bash
   npm run dev
   ```

## API Endpoints

### Room Types

- **POST /api/v1/room-types**: Create a new room type
- **GET /api/v1/room-types**: Get all room types
- **GET /api/v1/room-types/:id**: Get a room type by ID
- **PATCH /api/v1/room-types/:id**: Update a room type by ID
- **DELETE /api/v1/room-types/:id**: Delete a room type by ID

### Rooms

- **POST /api/v1/rooms**: Create a new room
- **GET /api/v1/rooms**: Get all rooms with optional filters
- **GET /api/v1/rooms/:id**: Get a room by ID
- **PATCH /api/v1/rooms/:id**: Update a room by ID
- **DELETE /api/v1/rooms/:id**: Delete a room by ID
```