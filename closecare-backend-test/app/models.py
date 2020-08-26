from app import db
from datetime import datetime
from sqlalchemy.orm import validates

class Employee(db.Model):
    __tablename__ = 'employee'
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    
    first_name = db.Column(
        db.String(40),
        unique=False,
        nullable=False
    )

    last_name = db.Column(
        db.String(40),
        unique=False,
        nullable=True
    )

    gender = db.Column(
        db.String(1),
        unique=False,
        nullable=False
    )

    birth_date = db.Column(
        db.Date,
        unique=False,
        nullable=True
    )

    CPF = db.Column(
        db.String(11),
        unique=True,
        nullable=False
    )
