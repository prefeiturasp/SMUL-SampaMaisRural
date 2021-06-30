FROM node:13.3
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install -g @angular/cli@8.3.20
COPY . /app
RUN mkdir -p node_modules
RUN npm install
CMD ng serve --host 0.0.0.0
