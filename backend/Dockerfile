FROM ruby:2.7.2-alpine

MAINTAINER Vinícius S. <vinicius@jurema.la>

RUN apk update && apk upgrade

RUN apk add -U build-base ruby-dev openssl-dev postgresql-dev postgresql-client libxml2-dev libxslt-dev git bash tzdata nodejs yarn && \
    rm -rf /var/cache/apk/*

RUN apk add --no-cache file
RUN apk --update add imagemagick

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
COPY . /app
COPY type.xml /usr/lib/ImageMagick-7.0.10/config-Q16HDRI/type.xml
COPY public/fonts/Lato-Bold.ttf /usr/lib/ImageMagick-7.0.10/config-Q16HDRI/Lato-Bold.ttf
COPY public/fonts/Manrope/static/Manrope-Medium.ttf /usr/lib/ImageMagick-7.0.10/config-Q16HDRI/
COPY public/fonts/Manrope/static/Manrope-ExtraBold.ttf /usr/lib/ImageMagick-7.0.10/config-Q16HDRI/

RUN bundle check || bundle install

EXPOSE 3000

RUN bundle exec whenever -c &&  whenever --update-crontab && touch ./log/cron.log
CMD crond && bundle exec rake db:gis:setup && bundle exec rake db:migrate && rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'
