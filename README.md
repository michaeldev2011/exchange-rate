<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Exchange - Rate API

This API is build with [Nest](https://github.com/nestjs/nest) framework.<br>
The goal of this Rest APi is calculate excghange-rate of severals currency's.<br>
By default the API have some values for USD and PEN currency, but you can populate
more values of diferents currency's
This Rest API only store data in memory, do not use Database.

The values by default of currency's are in the follow table

currencyInit | currencyTarget | exchange-rate
--- | --- | ---
*PEN* | *USD* | `0.27`
*USD* | *PEN* | `3.75`
*CLP* | *USD* | `0.0011`
*USD* | *CLP* | `890.83`

Here is the Postman Documentation.
[Postman](docs\postman)


Swagger Basic Documentation
```bash
$ npm run start
http://localhost:3003/api

```
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# build image of docker
$ docker build . --tag  exchange-rate

#execute api in docker.
$ docker run -it -p 3001:3001 exchange-rate

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


