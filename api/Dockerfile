FROM python:3.7.3

ENV HOST '0.0.0.0'
ENV PORT '80'

WORKDIR /var/www/api

COPY . /var/www/api

RUN pip3 install -r requirements.txt

CMD ["python3", "api.py"]