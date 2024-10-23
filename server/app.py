from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from extensions import db, migrate, login_manager
import os



def create_app():
    app = Flask(__name__, static_folder='static')
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
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