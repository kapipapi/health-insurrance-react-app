from flask import Flask, request, redirect

app = Flask(__name__)


@app.route('/', methods=['POST'])
def create():
    if request.method == 'POST':
        print(request.form)

    return redirect("https://kapipapi-curly-adventure-7rp9vp9r9xr3www4-3000.preview.app.github.dev/")


app.run()
