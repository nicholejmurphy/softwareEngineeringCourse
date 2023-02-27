from models import User, Post, Tag, PostTag, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()
Post.query.delete()

# USERS SEED
nicky = User(first_name="Nicky", last_name="Murphy")
chris = User(first_name="Chris", last_name="Coombs")
danni = User(first_name="Danni", last_name="Harris")
laby = User(first_name="Laby", last_name="Moombs")
mariah = User(first_name="Mariah", last_name="Hines")

db.session.add_all([nicky, chris, danni, laby, mariah])
db.session.commit()


# POSTS SEED
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

# TAGS SEED
t1 = Tag(name='yolo')
t2 = Tag(name='bestie')
t3 = Tag(name='funfunfun')
t4 = Tag(name='love')
t5 = Tag(name='adventure')
t6 = Tag(name='progress')
t7 = Tag(name='ohboy')

db.session.add_all([t1, t2, t3, t4, t5, t6, t7])
db.session.commit()

# PostTag SEED
a = PostTag(post_id=1, tag_id=7)
b = PostTag(post_id=1, tag_id=2)
c = PostTag(post_id=1, tag_id=4)
d = PostTag(post_id=2, tag_id=6)
e = PostTag(post_id=2, tag_id=7)
f = PostTag(post_id=3, tag_id=6)
g = PostTag(post_id=3, tag_id=3)
h = PostTag(post_id=3, tag_id=1)
i = PostTag(post_id=3, tag_id=7)
j = PostTag(post_id=4, tag_id=4)
k = PostTag(post_id=4, tag_id=3)
l = PostTag(post_id=4, tag_id=2)
m = PostTag(post_id=5, tag_id=3)
n = PostTag(post_id=5, tag_id=4)
o = PostTag(post_id=5, tag_id=5)
p = PostTag(post_id=6, tag_id=7)
q = PostTag(post_id=7, tag_id=1)
r = PostTag(post_id=7, tag_id=2)
s = PostTag(post_id=7, tag_id=3)
t = PostTag(post_id=8, tag_id=1)
u = PostTag(post_id=9, tag_id=6)
v = PostTag(post_id=10, tag_id=7)
w = PostTag(post_id=10, tag_id=3)
x = PostTag(post_id=10, tag_id=4)
y = PostTag(post_id=11, tag_id=3)
z = PostTag(post_id=11, tag_id=6)

db.session.add_all([a, b, c, d, e, f, g, h, i, j, k, l, m,
                   n, o, p, q, r, s, t, u, v, w, x, y, z])
db.session.commit()
