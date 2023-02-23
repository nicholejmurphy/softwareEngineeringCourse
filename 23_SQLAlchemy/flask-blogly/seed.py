from models import User, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

nicky = User(first_name="Nicky", last_name="Murphy")
chris = User(first_name="Chris", last_name="Coombs")
danni = User(first_name="Danni", last_name="Harris")
laby = User(first_name="Laby", last_name="Moombs")
mariah = User(first_name="Mariah", last_name="Hines")

db.session.add(nicky)
db.session.add(chris)
db.session.add(danni)
db.session.add(laby)
db.session.add(mariah)

db.session.commit()
