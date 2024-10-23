import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('postgresql://cocktail_admin:JWi2Mq2FRFZaoKATg24mUCUGRqRdhU7h@dpg-csbenvrtq21c739vcorg-a.oregon-postgres.render.com/cocktails_69sb') or 'sqlite:///cocktails.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False