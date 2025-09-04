# Weather API Wrapper Service

## Overview

This project is a **Weather API Wrapper Service** built as a training exercise to practice working with third-party APIs, caching, and environment variables, as outlined in the [roadmap.sh Weather API project](https://roadmap.sh/projects/weather-api-wrapper-service). The service fetches weather data from the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) and uses an in-memory cache to optimize performance by reducing redundant API calls. The project is implemented using **Node.js**, **Express**, and **node-cache** for caching.

## Features

- **Fetch Weather Data**: Retrieves current weather data for a specified city or country using the Visual Crossing API.
- **Caching**: Uses `node-cache` to store weather data in-memory with a 12-hour expiration time to improve performance.
- **Error Handling**: Returns meaningful error messages for invalid inputs or API failures.
- **Environment Variables**: Stores sensitive information like API keys using a `.env` file.
- **Rate Limiting** (Optional): Can be extended with `express-rate-limit` to prevent API abuse.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for handling HTTP requests.
- **node-cache**: In-memory caching library for storing weather data.
- **Axios**: HTTP client for making requests to the Visual Crossing API.
- **dotenv**: For managing environment variables.

## Project Structure

```
weather-api/
├── controllers/
│   └── weather.controller.js    # Handles API logic and data fetching
├── middlewares/
│   └── cache.middleware.js     # Checks cache before fetching data
├── routes/
│   └── weather.routes.js       # Defines API routes
├── .env                        # Environment variables (not tracked in git)
├── app.js                      # Main server file
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd weather-api
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:

   ```
   VisualCrossingAPI=your_visual_crossing_api_key
   PORT=3000
   ```

   - Replace `your_visual_crossing_api_key` with your actual Visual Crossing API key. You can get one for free from [Visual Crossing](https://www.visualcrossing.com/weather-api).

4. **Run the Server**:
   ```bash
   node app.js
   ```
   The server will start on `http://localhost:3000` (or the port specified in `.env`).

## Usage

- **Endpoint**: `GET /weather/:country`
  - `:country`: The name of the city or country (e.g., `Cairo`, `London`).
  - Query Parameter: `units` (optional, default: `metric`). Use `metric` for Celsius/kmh or `imperial` for Fahrenheit/mph.
- **Example Request**:
  ```
  GET http://localhost:3000/weather/Cairo?units=metric
  ```
- **Example Response**:
  ```json
  {
    "status": "success",
    "data": {
      "country": "Cairo",
      "temperature": {
        "value": 25.5,
        "unit": "C"
      },
      "humidity": 60,
      "wind": {
        "speed": 10.2,
        "unit": "km/h"
      },
      "condition": "Sunny",
      "last_updated": "2025-09-04T09:12:00Z"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "status": "error",
    "message": "Failed to fetch weather data"
  }
  ```

## How It Works

1. **Request Flow**:

   - The client sends a GET request to `/weather/:country` with an optional `units` query parameter.
   - The `cache.middleware.js` checks if the weather data for the requested country and units is available in the `node-cache` cache.
   - If cached data exists, it is returned immediately.
   - If not, the request is passed to the `weather.controller.js`, which fetches data from the Visual Crossing API.
   - The fetched data is then cached using `node-cache` with a 12-hour TTL and returned to the client.

2. **Caching**:

   - The cache key is generated as `weather:${country}:${units}` (e.g., `weather:Cairo:metric`).
   - Data is stored in-memory using `node-cache` and expires after 12 hours.

3. **Error Handling**:
   - If the Visual Crossing API fails or the country is invalid, a 500 status code is returned with an error message.
   - Cache errors are logged but do not affect the API response, ensuring the service remains functional.

## Future Improvements

- **Rate Limiting**: Add `express-rate-limit` to prevent API abuse.
- **Forecast Support**: Extend the API to include weather forecasts for multiple days.
- **Logging**: Implement logging with a library like `winston` to track requests and errors.
- **Redis Integration**: Replace `node-cache` with Redis for persistent and distributed caching in production.
- **Authentication**: Add API key authentication for secure access.

## Learning Outcomes

This project was built as a training exercise to learn:

- Interacting with third-party APIs (Visual Crossing).
- Implementing in-memory caching with `node-cache`.
- Using environment variables for configuration.
- Structuring a Node.js/Express API with middleware and controllers.
- Handling HTTP requests and errors effectively.

## Credits

- Built as part of the [roadmap.sh Weather API project](https://roadmap.sh/projects/weather-api-wrapper-service).
- Uses the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) for weather data.

## License

This project is licensed under the MIT License.
