# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Launch

Run `yarn install` followed by `yarn start` to start the project on http://localhost:3000/

## Details

- Avatars are generated randomly based on their ID in turn is generated using a UUID npm library
- Hit `ENTER` while typing a message to send it
- Friends array is hardcoded but could easily be dynamically loaded from a backend
- There is no storage of messages but again, these could easily be sent asynchrounosly to a backend to be stored.
- I tried to split into single components most of the blocks of the app. With more time, it could be improved.
- The app works best for resolutions > 800px 
