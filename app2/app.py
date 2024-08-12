from flask import Flask, render_template, request, redirect
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/process')
def process():
    # Получение IP и User-Agent с использованием Flask
    ip = request.remote_addr
    user_agent = request.headers.get('User-Agent')
    keyword_value = request.args.get("keyword")
    
    # Подготовка данных для API-запроса
    token = "pxtshqzgkd5p7fvkrm4rqtcv2cz7czyq"
    api_url = f"https://flyingbalance.icu/click_api/v3?token={token}&log=1&info=1&ip={ip}&user_agent={user_agent}&keyword={keyword_value}"
    
    # Выполнение запроса к API
    response = requests.get(api_url)
    
    if response.status_code == 200:
        data = response.json()
        if data.get('info', {}).get('url') == 'OFFER':
            return redirect(f"/main?keyword={keyword_value}")
        elif data.get('info', {}).get('url') == 'BOT':
            # Логика обработки BOT'а
            print("BOT detected")
    
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='8000')
