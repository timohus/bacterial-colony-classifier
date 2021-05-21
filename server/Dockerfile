FROM python:3.9.5-buster

ARG env="PROD"
ARG db_url=""
ENV ENV=$env
ENV DATABASE_URL=$db_url
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY requirements.txt ./

RUN apt-get update && apt-get -y install build-essential libpq-dev nginx
RUN pip install supervisor
# RUN pip install -r requirements.txt
RUN pip install --default-timeout=1200 --no-cache-dir -r requirements.txt
RUN mkdir -p /logs && mkdir -p /run/nginx && mkdir -p /run/daphne && mkdir -p /var/log/supervisor

COPY . ./
RUN chmod +x ./start.sh
RUN cat ./config/nginx.conf > /etc/nginx/nginx.conf && cat ./config/supervisord.conf > /etc/supervisord.conf

CMD ["./start.sh"]