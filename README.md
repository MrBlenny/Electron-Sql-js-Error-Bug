# Electron-Sql-js-Error-Bug
This repo demos a bug with electron and sql.js.

* Clone this repo.
* `npm install`
* In one terminal, `npm run server`
* In another terminal, `npm run app`

* You should see an error with no trace in the `npm run app` terminal.
* Comment out the sql.js import in `app/main/index.js` and the trace will appear.
