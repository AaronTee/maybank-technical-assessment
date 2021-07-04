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

Please note that there is a validation of minimum 3 characters for address input before the autocomplete request get sent.

### Redux Thunk

Google Map API service only can be accessed by using window.google library, not explicitly through API calling therefore react thunk in this project was only used for fetching mock data returned from a fake promise.

### Google Map API KEY

Please replace your own google map API_KEY to src/configs/index.ts file. Also note that your API_KEY must have these two API enabled in order the application works properly.

- Maps Javascript API
- Places API


