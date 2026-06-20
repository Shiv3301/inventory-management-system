from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):

    existing_product = db.query(Product).filter(
        Product.sku == product.sku
    ).first()

    if existing_product:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    if product.quantity_in_stock < 0:
        raise HTTPException(
            status_code=400,
            detail="Quantity cannot be negative"
        )

    new_product = Product(
        name=product.name,
        sku=product.sku,
        price=product.price,
        quantity_in_stock=product.quantity_in_stock
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.get("")
def get_products(
    db: Session = Depends(get_db)
):
    return db.query(Product).all()


@router.get("/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


@router.put("/{product_id}")
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db)
):

    existing_product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not existing_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    sku_exists = db.query(Product).filter(
        Product.sku == product.sku,
        Product.id != product_id
    ).first()

    if sku_exists:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    if product.quantity_in_stock < 0:
        raise HTTPException(
            status_code=400,
            detail="Quantity cannot be negative"
        )

    existing_product.name = product.name
    existing_product.sku = product.sku
    existing_product.price = product.price
    existing_product.quantity_in_stock = product.quantity_in_stock

    db.commit()
    db.refresh(existing_product)

    return existing_product


@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }