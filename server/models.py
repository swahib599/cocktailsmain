from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db, login_manager

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))

class Cocktail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(200))
    instructions = db.Column(db.Text, nullable=False)
    glass_type = db.Column(db.String(50))
    ingredients = db.relationship('CocktailIngredient', back_populates='cocktail')
    reviews = db.relationship('Review', back_populates='cocktail')

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    cocktails = db.relationship('CocktailIngredient', back_populates='ingredient')

class CocktailIngredient(db.Model):
    cocktail_id = db.Column(db.Integer, db.ForeignKey('cocktail.id'), primary_key=True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredient.id'), primary_key=True)
    amount = db.Column(db.String(50))
    cocktail = db.relationship('Cocktail', back_populates='ingredients')
    ingredient = db.relationship('Ingredient', back_populates='cocktails')

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    cocktail_id = db.Column(db.Integer, db.ForeignKey('cocktail.id'), nullable=False)
    rating = db.Column(db.Integer)  # 1 for like, -1 for dislike
    comment = db.Column(db.Text)
    user = db.relationship('User', backref=db.backref('reviews', lazy=True))
    cocktail = db.relationship('Cocktail', back_populates='reviews')