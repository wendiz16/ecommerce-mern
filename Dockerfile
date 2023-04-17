FROM node:16.20-slim

WORKDIR /ecommerce/

COPY ./ /ecommerce/

RUN npm install && cd frontend && npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
