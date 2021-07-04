# Maybank Technical Assignment

This project uses ReactJS with a custom boilerplate.

## Run the project

NPM
```sh
npm install
npm start
```

YARN
```sh
yarn
yarn start
```

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Acknowledgement

### Input Validation

Please note that there is a validation of minimum 3 characters for address input before the autocomplete API get sent.

### Redux Thunk

Google Map API service only can be accessed by using window.google library, not explicitly through API calling therefore react thunk in this project was only used for fetching mock data returned from a promise.

### Google Map API KEY

Currently the API_KEY was using my own created api key, which has quota limit set by me as it's on-demand basis charged, to whom that need more quota for evaluation purposes please contact me personally.