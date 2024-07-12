from flask import Flask, render_template, send_from_directory, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dmca')
def dmca():
    return render_template('dmca.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/pwa')
def pwa():
    return render_template('pwa.html')

@app.route('/manifest.json')
def serve_manifest():
    return send_from_directory('static/', 'manifest.json')

@app.route('/sw.js')
def serve_sw():
    return send_from_directory('static/', 'sw.js')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000')
