# This project Combine Server (.NET Core) And Client (React)

# This Server Use .NET Core

this project use as API proxy through which you can

o GET pagination results (related topics), based on a query parameter, from DuckDuckGo
( http://api.duckduckgo.com/?q=x&format=json ) via GET

you can find the request and response models at https://localhost:44334/swagger/index.html

this project allow cors for http://localhost:3000

## Running The Project

open the solution and click the play button

# This Client Use Create React App

this project use axios to send http requests (to a url from src/consts/const, if you want to change.. default is the server project host) and store the results to Redux state.

results will populate in paginateion table, where each change send request to bring new results.

each query will saved at the right side of the screen where click on a qeuery will resualt new search.

you can also find a finder (similar to google chrome “find” ) that will count and highlight every search parameter on the screen (except himself)

## Available Scripts

In the project directory, you can run:

### `yarn`

for building fresh node_modules

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.