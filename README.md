# Inventory Management System

## Overview

This is a full-stack Inventory Management System built using FastAPI, PostgreSQL, React, and Bootstrap.

The system provides:

* Product Management
* Customer Management
* Order Processing
* Inventory Tracking
* Dashboard Statistics
* API Documentation using Swagger

---

## Technologies Used

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic

### Frontend

* React
* Vite
* Bootstrap
* Axios

---

## Features

### Products

* Add Product
* View Products
* Update Product
* Delete Product
* Duplicate SKU Validation

### Customers

* Add Customer
* View Customers
* Delete Customer
* Duplicate Email Validation

### Orders

* Create Order
* Calculate Total Amount
* Update Inventory Stock
* Insufficient Stock Validation

### Dashboard

* Total Products
* Total Customers
* Total Orders
* Low Stock Products

---

## Running Backend

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Running Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

## Database

PostgreSQL

---

## Docker

The project includes:

* Dockerfile
* docker-compose.yml

---

## Author

Shiv Kumar
