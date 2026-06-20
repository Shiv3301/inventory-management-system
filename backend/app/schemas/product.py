from pydantic import BaseModel

class ProductCreate(BaseModel):

    name: str
    sku: str
    price: float
    quantity_in_stock: int


class ProductResponse(ProductCreate):

    id: int

    class Config:
        from_attributes = True