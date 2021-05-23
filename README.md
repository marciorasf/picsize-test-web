# PicSize Test Web

This repo contains the frontend of Picsize's admission test.

You can check the live version on [picsize-test](picsize-test.marciorasf.space).

The backend can be found on [picsize-test-api](https://github.com/marciorasf/picsize-test-api).

The test consisted in creating a tool to simulate a loan for a person. At the end of the simulation, the person could fullfill the loan process. The loans made should be stored on a JSON that can be requested using a backend's endpoint.

The main technologies I used to implement the frontend were:

- React.js
- Axios
- Material-UI

## How to run locally

1. Clone the repo

```bash
git clone git@github.com:marciorasf/picsize-test-web.git
```

2. Install dependencies

```bash
yarn
```

3. Make a copy of .env.example as .env

```bash
cp .env.example .env
```

4. Start the server

```bash
yarn start
```
