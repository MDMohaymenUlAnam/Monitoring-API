# Project Name

Monitoring API with Node.js, Express, and Twilio

## Description

This project provides a Monitoring API built with Node.js and Express. It allows users to monitor certain events or data and receive notifications via SMS using Twilio.

The API provides endpoints for registering monitoring events, updating event status, and retrieving event data. When an event status is updated, the API automatically sends an SMS notification to the configured phone number using Twilio's SMS service.

## Features

- Register monitoring events: Users can register events by providing event details such as name, description, and target resource.
- Update event status: Events can be updated with a new status (e.g., "ongoing," "resolved") via API endpoints.
- Retrieve event data: Users can fetch event data, including event details and status, via API endpoints.
- SMS notifications: The API integrates with Twilio's SMS service to send notifications to a configured phone number whenever an event's status is updated.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v14 or above)
- npm package manager
- Twilio account and phone number with SMS capabilities
- MongoDB (or any other supported database) for storing event data

## Installation

1. Clone the repository:

```shell
git clone https://github.com/your-username/monitoring-api.git
```

2. Change to the project's directory:

```shell
cd monitoring-api
```

3. Install the dependencies:

```shell
npm install
```

4. Configure environment variables:

   - Rename the `.env.example` file to `.env`.
   - Update the `.env` file with your Twilio credentials and database connection details.

5. Start the application:

```shell
npm start
```

The API will be accessible at `http://localhost:3000`.

## Usage

To use the Monitoring API, follow these steps:

1. Register an event by sending a POST request to the `/events` endpoint with the required event details.

2. Update the event status by sending a PUT request to the `/events/:eventId` endpoint, providing the event ID and the new status.

3. Retrieve event data by sending a GET request to the `/events/:eventId` endpoint, specifying the event ID.

4. Receive SMS notifications for event status updates on the configured phone number.

Refer to the API documentation for detailed information on the available endpoints and request/response formats.

## API Documentation

The API documentation can be found at `http://localhost:3000/api-docs` once the application is running. It provides detailed information about the endpoints, request/response formats, and example usage.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or need further assistance, feel free to contact the project maintainer:

- Name: MD Mohaymen Ul Anam
- Email: mohaymenulanamnihan@gmail.com

