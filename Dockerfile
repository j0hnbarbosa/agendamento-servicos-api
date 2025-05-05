FROM node:20-alpine
# RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY package.json .
RUN npm install
COPY . .
# RUN chown -R app /opt/app
# USER app
EXPOSE 5001
CMD [ "npm", "start" ]