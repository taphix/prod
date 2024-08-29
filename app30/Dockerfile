FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        libpq-dev \
        python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir Flask==3.0.2
RUN pip install --no-cache-dir Werkzeug==3.0.1
RUN pip install --no-cache-dir Jinja2==3.1.3
RUN pip install --no-cache-dir requests==2.32.3

COPY . /app

EXPOSE 80

CMD ["python", "app.py"]
