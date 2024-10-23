from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from models import Cocktail, Ingredient, Review, db
from extensions import db

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return jsonify({"message": "Welcome to the Cocktail API"})

@main.route('/api/cocktails')
def get_cocktails():
    glass_type = request.args.get('glass_type')
    if glass_type:
        cocktails = Cocktail.query.filter_by(glass_type=glass_type).all()
    else:
        cocktails = Cocktail.query.all()
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'image_url': c.image_url,
        'glass_type': c.glass_type,
        'instructions': c.instructions,
        'ingredients': [{
            'name': i.ingredient.name,
            'amount': i.amount
        } for i in c.ingredients]
    } for c in cocktails])

@main.route('/api/cocktails/<int:id>')
def get_cocktail(id):
    cocktail = Cocktail.query.get_or_404(id)
    return jsonify({
        'id': cocktail.id,
        'name': cocktail.name,
        'image_url': cocktail.image_url,
        'instructions': cocktail.instructions,
        'glass_type': cocktail.glass_type,
        'ingredients': [{
            'name': i.ingredient.name,
            'amount': i.amount
        } for i in cocktail.ingredients],
        'reviews': [{
            'user': r.user.username,
            'rating': r.rating,
            'comment': r.comment
        } for r in cocktail.reviews]
    })

@main.route('/api/cocktails/<int:id>/review', methods=['POST'])
@login_required
def add_review(id):
    cocktail = Cocktail.query.get_or_404(id)
    data = request.json
    review = Review(
        user_id=current_user.id,
        cocktail_id=cocktail.id,
        rating=data.get('rating'),
        comment=data.get('comment')
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({'message': 'Review added successfully'}), 201

@main.route('/api/categories')
def get_categories():
    categories = db.session.query(Cocktail.glass_type).distinct().all()
    return jsonify([c[0] for c in categories if c[0]])

@main.route('/api/search')
def search_cocktails():
    query = request.args.get('q', '')
    cocktails = Cocktail.query.filter(Cocktail.name.ilike(f'%{query}%')).all()
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'image_url': c.image_url,
        'glass_type': c.glass_type,
        'instructions': c.instructions,
        'ingredients': [{
            'name': i.ingredient.name,
            'amount': i.amount
        } for i in c.ingredients]
    } for c in cocktails])