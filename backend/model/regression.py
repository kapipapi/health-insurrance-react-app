import pandas as pd
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, AdaBoostRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.tree import DecisionTreeRegressor
from xgboost import XGBRegressor

lr = LinearRegression()
ridge = Ridge(alpha=0.5)
dt = DecisionTreeRegressor(max_depth=3)
rf = RandomForestRegressor(max_depth=3, n_estimators=500)
ada = AdaBoostRegressor(n_estimators=50, learning_rate=.01)
gbr = GradientBoostingRegressor(max_depth=3, n_estimators=50, learning_rate=.2)
xgb = XGBRegressor(max_depth=3, n_estimators=50, learning_rate=.2)


def load_data(path):
    data = pd.read_csv(path)
    data = preprocess_data(data)

    x = data.drop(['charges'], axis=1)
    y = data.charges

    return x, y


def preprocess_data(data):
    row = pd.DataFrame(data)

    le = preprocessing.LabelEncoder()
    le.fit(row.sex.drop_duplicates())
    row.sex = le.transform(row.sex)

    le.fit(row.smoker.drop_duplicates())
    row.smoker = le.transform(row.smoker)

    le.fit(row.region.drop_duplicates())
    row.region = le.transform(row.region)

    return row


def train(model, data):
    x, y = load_data(data)
    x_train, x_test, y_train, y_test = train_test_split(x, y, random_state=0)
    model.fit(x_train, y_train)
    accuracy = model.score(x_test, y_test).round(5)

    model.save_model('model.json')
    print("Model score:", accuracy)


def predict_charges(data):
    data = preprocess_data(data)
    xgb.load_model('./model/model.json')

    result = round(xgb.predict(data).astype(float).item(0), 2)
    return result


if __name__ == '__main__':

    post = [{
        "age": 28,
        "sex": "male",
        "bmi": 33,
        "children": 0,
        "smoker": 1,
        "region": "southeast"
    }]

    train(xgb, '../dataset/insurance.csv')
    prediction = predict_charges(post)
    print(f"The estimated insurance cost is equal to: {prediction}$")
