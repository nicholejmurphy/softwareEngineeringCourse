from models import User, Post, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()
Post.query.delete()

nicky = User(first_name="Nicky", last_name="Murphy")
chris = User(first_name="Chris", last_name="Coombs")
danni = User(first_name="Danni", last_name="Harris")
laby = User(first_name="Laby", last_name="Moombs")
mariah = User(first_name="Mariah", last_name="Hines")

db.session.add_all([nicky, chris, danni, laby, mariah])

db.session.commit()

p1 = Post(title='Chris', content='My favorite human, best cook, home.', user_id='1')
p2 = Post(title='Course',
          content='Busy busy. One third of the way done! Yippee!', user_id='1')
p3 = Post(title='Running', content='Run run run RUNNING!!', user_id='2')
p4 = Post(title='Nicky', content='I love Nicky.', user_id='2')
p5 = Post(title='Kids', content='Liam and Zoey are the best.', user_id='3')
p6 = Post(title='Cooking',
          content='Brett may have eaten bad meat last night. Stay tuned.', user_id='3')
p7 = Post(title='Meow', content='Meow meow meow', user_id='4')
p8 = Post(title='Meowww', content='MEOW MEOW MEOW MEOWWWW', user_id='4')
p9 = Post(title='Mariah',
          content='New job and fresh promotion! WHoop whoop!', user_id='5')
p10 = Post(title='New BF', content='Also new bf spencer. Cute boi.', user_id='5')
p11 = Post(title='Ultrasound', content='I love my job.', user_id='5')

db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11])

db.session.commit()
