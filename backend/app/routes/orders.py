from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.models.customer import Customer
from app.schemas.order import OrderCreate

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post("")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.id == order.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    total_amount = 0

    new_order = Order(
        customer_id=order.customer_id,
        total_amount=0
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in order.items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found"
            )

        if product.quantity_in_stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for {product.name}"
            )

        product.quantity_in_stock -= item.quantity

        item_total = product.price * item.quantity

        total_amount += item_total

        order_item = OrderItem(
            order_id=new_order.id,
            product_id=product.id,
            quantity=item.quantity,
            unit_price=product.price
        )

        db.add(order_item)

    new_order.total_amount = total_amount

    db.commit()

    return {
        "order_id": new_order.id,
        "total_amount": total_amount
    }


@router.get("")
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()


@router.get("/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order


@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted successfully"
    }