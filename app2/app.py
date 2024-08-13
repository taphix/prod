from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

@app.route('/')
def index():
    ip = request.remote_addr
    user_agent = request.headers.get('User-Agent')
    keyword_value = request.args.get("keyword")
    
    if not keyword_value:
        return render_template('index.html')

    token = "pxtshqzgkd5p7fvkrm4rqtcv2cz7czyq"
    api_url = f"https://flyingbalance.icu/click_api/v3?token={token}&log=1&info=1&ip={ip}&user_agent={user_agent}&keyword={keyword_value}"
    
    response = requests.get(api_url)
    print(response)
    
    if response.status_code == 200:
        data = response.json()
        print(data)
        if data.get('info', {}).get('url') == 'OFFER':
            return redirect(url_for('main'))
        elif data.get('info', {}).get('url') == 'BOT':
            return render_template('index.html', message="BOT", keyword=keyword_value, ip=ip)
    
    return render_template('index.html')

@app.route('/main')
def main():
    keyword_value = request.args.get("keyword")
    return render_template('main.html', keyword=keyword_value)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
