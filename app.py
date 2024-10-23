from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from extensions import db, migrate, login_manager
import os

def create_app():
    app = Flask(__name__, static_folder='static')
    
    # CORS Configuration
    cors_config = {
        "origins": [
            "http://localhost:3000",
            "http://localhost:5173",
            "https://cocktail-combined.vercel.app",
            "https://*.vercel.app"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
        "expose_headers": ["Content-Range", "X-Content-Range"],
        "max_age": 600
    }
    
    CORS(app, resources={r"/*": cors_config})
    
    # Security headers middleware
    @app.after_request
    def add_security_headers(response):
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.headers['Access-Control-Allow-Origin'] = 'https://cocktail-combined.vercel.app'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    @app.route('/static/<path:filename>')
    def send_static(filename):
        return send_from_directory('static', filename)

    with app.app_context():
        from routes import main as main_blueprint
        app.register_blueprint(main_blueprint)

        from auth import auth as auth_blueprint
        app.register_blueprint(auth_blueprint)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)