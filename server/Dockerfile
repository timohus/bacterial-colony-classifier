FROM python:3.9.5-buster

ARG env="PROD"
ARG db_url=""
ENV ENV=$env
ENV DATABASE_URL=$db_url
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY requirements.txt ./

RUN apt-get update && apt-get -y install build-essential libpq-dev nginx unzip
RUN pip install supervisor
# RUN pip install -r requirements.txt
RUN pip install --default-timeout=1200 --no-cache-dir -r requirements.txt
RUN mkdir -p /logs && mkdir -p /run/nginx && mkdir -p /run/daphne && mkdir -p /var/log/supervisor

RUN wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1V8QvxtGVHmYhwnusl81JFpnM1XcX6USB' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1V8QvxtGVHmYhwnusl81JFpnM1XcX6USB" -O ./model.zip && rm -rf /tmp/cookies.txt

COPY . ./

RUN unzip -o ./model.zip -d ./ml/models/v5 && rm -fr ./ml/models/v5.zip

RUN chmod +x ./start.sh
RUN cat ./config/nginx.conf > /etc/nginx/nginx.conf && cat ./config/supervisord.conf > /etc/supervisord.conf

CMD ["./start.sh"]