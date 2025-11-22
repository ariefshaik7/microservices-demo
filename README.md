
**The Wardrobe Co.** is a microservices demo application. The application is a web-based e-commerce app where users can browse items, add them to the cart, and purchase them.

This project demonstrates a full-stack implementation using React, Node.js, TypeScript, Docker, and PostgreSQL.

## 🏗️ Architecture

The application is composed of multiple loosely coupled microservices, each responsible for a specific domain. An Nginx reverse proxy sits in front of all services, acting as an API Gateway.

##  Tech Stack

- **Frontend:** React, TypeScript, Vite, Axios, Context API
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **Infrastructure:** Docker, Docker Compose, Nginx
- **Styling:** CSS Modules / Vanilla CSS

## 📦 Microservices Overview

| Service | Description |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [frontend](/src/frontend)                           | React-based user interface. Exposes an HTTP server to serve the website. |
| [product-service](/src/product-service)             | Provides the list of products from the database and ability to search products and get individual products. |
| [order-service](/src/order-service)                 | Handles order creation and history. |
| [user-service](/src/user-service)                   | Manages user authentication and profiles. |
| [cart-service](/src/cart-service)                   | Stores the items in the user's shopping cart in PostgreSQL and retrieves it. |
| [payment-service](/src/payment-service)             | Charges the given credit card info (mock) with the given amount and returns a transaction ID. |
| [shipping-service](/src/shipping-service)           | Gives shipping cost estimates based on the shopping cart. Ships items to the given address (mock). |
| [email-service](/src/email-service)                 | Sends users an order confirmation email (mock). |
| [checkout-service](/src/checkout-service)           | Retrieves user cart, prepares order and orchestrates the payment, shipping and the email notification. |
| [currency-service](/src/currency-service)           | Converts one money amount to another currency. Uses real values fetched from external API. |

---
## Application UI
                 
| Home Page                                      | Checkout Screen                               | Login Page                                   |
| -----------------------------------------------|-----------------------------------------------|----------------------------------------------|
| [![Screenshot of store homepage](/docs/images/wardrobe-frontend-1.png)](/docs/images/wardrobe-frontend-1.png) | [![Screenshot of checkout screen](/docs/images/wardrobe-frontend-2.png)](/docs/images/wardrobe-frontend-2.png) | [![Screenshot of Login page](/docs/images/wardrobe-frontend-3.png)](/docs/images/wardrobe-frontend-3.png) |



## 🛠️ Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd cloth-store
    ```

2.  **Start the application:**
    Run the following command to build and start all services:
    ```bash
    docker compose up --build
    ```

3.  **Access the application:**
    Open your browser and navigate to:
    [http://localhost:5173](http://localhost:5173)

    *Note: The Nginx gateway is also available on port 80, but for development, we typically access the frontend directly or via the proxy at http://localhost.*

## 📂 Project Structure

```
cloth-store/
├── cart-service/       # Cart management service
├── checkout-service/   # Checkout orchestration service
├── currency-service/   # Currency conversion service
├── email-service/      # Email notification service
├── frontend/           # React frontend application
├── nginx/              # Nginx configuration
├── order-service/      # Order management service
├── payment-service/    # Payment processing service
├── product-service/    # Product catalog service
├── shipping-service/   # Shipping calculation service
├── user-service/       # User authentication service
├── docker-compose.yml  # Docker Compose orchestration
└── README.md           # Project documentation
```

## 🔧 Development

- **Adding a new service:** Create a new directory, add a `Dockerfile`, and update `docker-compose.yml` and `nginx/nginx.conf`.
- **Database:** All services share a single PostgreSQL instance for simplicity in this demo, but they use separate tables.
- **Environment Variables:** Configuration is managed via `docker-compose.yml` environment variables.
