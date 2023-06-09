from flask import Flask, request, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
import logging
from logging.handlers import RotatingFileHandler
from flask_cors import CORS

from model.regression import predict_charges

log_handler = RotatingFileHandler('app.log', maxBytes=1024*1024, backupCount=10)
log_handler.setLevel(logging.INFO)
log_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))

app = Flask(__name__)
CORS(app)

app.logger.addHandler(log_handler)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:kukurydza12@database:5432/hia'
db = SQLAlchemy(app)

class Entry(db.Model):
    __tablename__ = 'user_data'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    sex = db.Column(db.String(10), nullable=False)
    bmi = db.Column(db.Float, nullable=False)
    children = db.Column(db.Integer, nullable=False)
    smoker = db.Column(db.String(5), nullable=False)
    region = db.Column(db.String(20), nullable=False)
    charges = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return f'User {self.name}'

    def __init__(self, name, email, age, sex, bmi, children, smoker, region):
        self.name = name
        self.email = email
        self.age = age
        self.sex = sex
        self.bmi = bmi
        self.children = children
        self.smoker = smoker
        self.region = region


with app.app_context():
    db.create_all()


@app.route('/', methods=['POST'])
def create_entry():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/x-www-form-urlencoded':
        form = request.form

        if "smoker" in form:
            smoker = 1 if form["smoker"] == 'on' else 0
        else:
            smoker = 0

        new_data = {
            "name": form["name"],
            "email": form["email"],
            "age": int(form["age"]),
            "sex": 0,
            "bmi": int(form['weight']) / int(form['height']) ** 2,
            "children": int(form["children"]),
            "smoker": smoker,
            "region": 0
        }

        entry = Entry(name=new_data["name"],
                      email=new_data["email"],
                      age=new_data["age"],
                      sex=new_data["sex"],
                      bmi=new_data["bmi"],
                      children=new_data["children"],
                      smoker=new_data["smoker"],
                      region=new_data["region"])

        new_data.pop('name')
        new_data.pop('email')
        entry.charges = predict_charges([new_data])

        db.session.add(entry)
        db.session.commit()

        return redirect(
            f"http://localhost:3000/result?name={entry.name}&charges={entry.charges}")

    else:
        return 'Content-Type not supported!'

@app.route('/', methods=['GET'])
def get_table():
    users = Entry.query.all()

    results = []
    for user in users:
        results.append({
            "name": user.name,
            "age": user.age,
            "charges": user.charges,
        })

    return jsonify(results)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True)
