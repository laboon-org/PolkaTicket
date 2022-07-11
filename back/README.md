# Polka-Ticket Api

## Table of contents

* [General Info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info

Api Base Source Path: /api/**

## Technologies

### Api Tech-Stack

* PostgreSQL: v11
* Hasura Cloud: v2
* Heroku: ?
* Docker: ?

### Setup

* Link: <https://hasura.io/docs/latest/graphql/core/index/>

### Prequisites

```sh
node v16
npm install
npm run build
```

### Deployment

#### Heroku

```sh
* Step-1: git init
* Step-2: heroku git:remote -a agile-fortress-27795
* Step-3: git add .
* Step-4: git commit -am "init"
* Step-5: git push heroku master
```

#### Link

* App Heroku: <https://dashboard.heroku.com/apps/agile-fortress-27795/deploy/heroku-git>
* Host : <https://agile-fortress-27795.herokuapp.com/>
* Heroku Cloud: <https://cloud.hasura.io/project/9399b044-e6aa-4df7-9885-59a8db810a95/console/api/api-explorer>

## NodeJS

### Express v4

This is a starter kit for `nodejs` with `express`. To get started:

Firstly, [download the starter-kit](https://github.com/hasura/codegen-assets/raw/master/nodejs-express/nodejs-express.zip) and `cd` into it.

```sh
cd api
npm ci
ENV prod: npm start
ENV dev: npm test
ENV stage: npm stage
```

#### Entry Point

- Open Access
```sh
http://localhost:3000/hello
```

- Terminate Process Api
```sh
Mac-OS: Ctrl+C
```

The entrypoint for the server lives in `src/server.js`.

If you wish to add a new route (say `/greet`) , you can add it directly in the `server.js` as:

```js
app.get('/hello', (req, res) => {
  return res.json({
    "greeting": "have a nice day"
  });
});
```

#### Error Handling

You can throw an error object or a list of error objects from your handler. The response must be 4xx and the error object must have a string field called `message`.

```js
retun res.status(400).json({
  message: 'invalid email'
});
```
