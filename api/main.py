import requests
import json

def make_api_request():
    url = "https://flyingbalance.icu/click_api/v3?token=pxtshqzgkd5p7fvkrm4rqtcv2cz7czyq&log=1&info=1&sub_id_1=subid1"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError if the HTTP request returned an unsuccessful status code
        data = response.json()
        print(json.dumps(data, indent=2))
    except requests.exceptions.RequestException as error:
        print(f"Error: {error}")

make_api_request()
