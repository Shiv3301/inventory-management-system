from pydantic import BaseModel
from typing import List


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate]


class OrderResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: float

    class Config:
        from_attributes = True