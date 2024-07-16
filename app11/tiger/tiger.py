from flask import Blueprint, render_template, url_for, redirect, session, request, flash, g

tiger = Blueprint('tiger', __name__, template_folder='templates', static_folder='static')

@tiger.route('/')
def index():
    return render_template('index.html')

@tiger.route('/privacy')
def privacy():
    return render_template('privacy.html')

@tiger.route('/cookie')
def cookie():
    return render_template('cookie.html')