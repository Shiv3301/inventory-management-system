from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Order(Base):

    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id")
    )

    total_amount = Column(Float)

    customer = relationship("Customer")

    items = relationship(
        "OrderItem",
        cascade="all, delete"
    )