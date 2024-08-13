from flask import Flask, render_template, request, redirect, url_for, send_from_directory
import requests

app = Flask(__name__)

@app.route('/')
def index():
    ip = request.remote_addr
    user_agent = request.headers.get('User-Agent')
    params = request.args
    keyword_value = params.get("keyword")
    
    if not keyword_value:
        return render_template('index.html')

    token = "pxtshqzgkd5p7fvkrm4rqtcv2cz7czyq"
    api_url = f"https://flyingbalance.icu/click_api/v3?token={token}&log=1&info=1&ip={ip}&user_agent={user_agent}&keyword={keyword_value}"
    
    response = requests.get(api_url)
    print(response)

    if response.status_code == 200:
        data = response.json()
        print(data.get('info', {}).get('url'))
        if data.get('info', {}).get('url') == 'do5WKVd4':
            return redirect(url_for('main', **params))
        else:
            return render_template('index.html', message="BOT", keyword=keyword_value, ip=ip)
    
    return render_template('index.html')


@app.route('/privacy')
def privacy():
    return render_template('privacy.html')
    
@app.route('/terms')
def terms():
    return render_template('terms.html')
    
@app.route('/dmca')
def dmca():
    return render_template('dmca.html')
    
@app.route('/data')
def data():
    return render_template('data.html')
    
@app.route('/cookie')
def cookie():
    return render_template('cookie.html')

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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
