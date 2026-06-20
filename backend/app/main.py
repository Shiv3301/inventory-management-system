from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order
from app.models.order_item import OrderItem

from app.routes.products import router as product_router
from app.routes.customers import router as customer_router
from app.routes.orders import router as order_router
from app.routes.dashboard import router as dashboard_router


app = FastAPI(
    title="Inventory Management API"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {
        "message": "Inventory API Running"
    }