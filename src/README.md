# The Wardrobe Co. - Microservices Cloth Store

A modern, scalable e-commerce application built with a microservices architecture. This project demonstrates a full-stack implementation using React, Node.js, TypeScript, Docker, and PostgreSQL.

## 🏗️ Architecture

The application is composed of multiple loosely coupled microservices, each responsible for a specific domain. An Nginx reverse proxy sits in front of all services, acting as an API Gateway.

```mermaid
graph TD
    Client[Client Browser]
    Nginx[Nginx Gateway (Port 80)]
    
    subgraph Frontend
        FE[Frontend (React + Vite)]
    end
    
    subgraph Backend Services
        Product[Product Service]
        Order[Order Service]
        User[User Service]
        Cart[Cart Service]
        Payment[Payment Service]
        Shipping[Shipping Service]
        Email[Email Service]
        Checkout[Checkout Service]
        Currency[Currency Service]
    end
    
    subgraph Database
        DB[(PostgreSQL)]
    end

    Client -->|HTTP/80| Nginx
    
    Nginx -->|/| FE
    Nginx -->|/api/products| Product
    Nginx -->|/api/orders| Order
    Nginx -->|/api/users| User
    Nginx -->|/api/cart| Cart
    Nginx -->|/api/payment| Payment
    Nginx -->|/api/shipping| Shipping
    Nginx -->|/api/email| Email
    Nginx -->|/api/checkout| Checkout
    Nginx -->|/api/currency| Currency

    Checkout --> Cart
    Checkout --> Payment
    Checkout --> Shipping
    Checkout --> Email
    Checkout --> Order
    
    Product --> DB
    Order --> DB
    User --> DB
    Cart --> DB
```

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Vite, Axios, Context API
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **Infrastructure:** Docker, Docker Compose, Nginx
- **Styling:** CSS Modules / Vanilla CSS

## 📦 Microservices Overview

| Service | Port | Description |
|---------|------|-------------|
| **Frontend** | 5173 | React-based user interface. |
| **Product Service** | 3001 | Manages product catalog and inventory. |
| **Order Service** | 3002 | Handles order creation and history. |
| **User Service** | 3003 | Manages user authentication and profiles. |
| **Cart Service** | 3004 | Manages temporary shopping cart data. |
| **Payment Service** | 3005 | Mock payment processing. |
| **Shipping Service** | 3006 | Handles shipping calculations. |
| **Email Service** | 3007 | Mock email notifications. |
| **Checkout Service** | 3008 | Orchestrates the checkout workflow. |
| **Currency Service** | 3009 | Handles currency conversion rates. |

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
