from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

from model.regression import predict_charges

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:kukurydza12@localhost:5432/health-insurance-app'
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

@app.route('/', methods=['POST'])
def create_entry():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/x-www-form-urlencoded':
        form = request.form

        new_data = {
            "name": form["name"],
            "email": form["email"],
            "age": int(form["age"]),
            "sex": 0,
            "bmi": int(form['weight']) / int(form['height']) ** 2,
            "children": int(form["children"]),
            "smoker": int(form["smoker"]),
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

        return jsonify({'name': entry.name, 'charges': entry.charges})
    else:
        return 'Content-Type not supported!'


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True)


