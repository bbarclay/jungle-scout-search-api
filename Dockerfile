FROM keymetrics/pm2:latest-jessie

MAINTAINER Alexey Kulakov <uni_que@me.com>

RUN pm2 install profiler

# Configure
COPY run.sh /run.sh
RUN chmod +x /run.sh

WORKDIR /var/www

# Install app
COPY package*.json ./
COPY . .

RUN npm i --prod -q

# Expose
EXPOSE 3000

CMD ["/run.sh"]
