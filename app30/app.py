from flask import Flask, render_template, request, redirect, url_for, send_from_directory
import requests
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
app = Flask(__name__, static_folder='www')

def getP(lan):
    v = "p_en"
    if lan == "en":
        v = "p_en"
    if lan == "hi":
        v = "p_hi"

    return send_from_directory(app.static_folder, f"{v}/main.html")



@app.route('/')
def index():
    accept_language = request.headers.get('Accept-Language')
    if accept_language:
        lan = accept_language.split(',')[0].split(';')[0].strip()[:2]
    else:
        lan = None
    ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    user_agent = request.headers.get('User-Agent')
    keyword_value = request.args.get("keyword")

    logger.info(f"{keyword_value}\n{ip}\n{user_agent}")
    if not keyword_value:
        return send_from_directory(app.static_folder, 'index.html')

    token = "pxtshqzgkd5p7fvkrm4rqtcv2cz7czyq"
    api_url = f"https://flyingbalance.icu/click_api/v3?token={token}&log=1&info=1&ip={ip}&user_agent={user_agent}&keyword={keyword_value}&language={lan}"

    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        logger.info(data.get('info', {}).get('url'))
        if data.get('info', {}).get('url') == 'do5WKVd4':
            return getP(lan)
        else:
            return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
