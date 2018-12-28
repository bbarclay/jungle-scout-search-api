FROM keymetrics/pm2:latest-jessie

MAINTAINER Alexey Kulakov <uni_que@me.com>

RUN pm2 install profiler

# Configure
COPY *.sh /
RUN chmod +x /run.sh /wait-for-it.sh

WORKDIR /var/www

# Install app
COPY package*.json ./
COPY . .

RUN npm i --prod -q

# Expose
EXPOSE 80

CMD ["/run.sh"]
