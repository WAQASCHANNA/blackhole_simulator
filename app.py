from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/particles')
def particles():
    particles = [{'x': random.uniform(0, 800), 'y': random.uniform(0, 600)} for _ in range(200)]
    return jsonify(particles)

if __name__ == '__main__':
    app.run(debug=True)
