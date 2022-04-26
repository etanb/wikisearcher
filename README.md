# Getting Started with WikiViews (ie: Create React App)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

By default, the data that's loaded is yesterday's 100 most viewed pages on wikipedia. You can adjust the day's data by clicking on the top right calendar and choosing a new day. You can also filter how many results are shown (25, 50, 75, 100, 200) with the "Max Results" button.

Once you've chosen your dataset, you can then peruse the date, arranged in ascending descending viewcount order, along the timeline. All of the cards have a "More info" button that can be clicked to have a Modal appear with additional information including: article title, article excerpt, and top 3 view count days of the last 30 days.

## Performance considerations

- The "More info" modal requires two API calls: 1) Get extra article data like the excerpt 2) Get view counts for the past 30 days. This is only executed on a user clicking "More info" since loading all of those calls in advance is very expensive.

- If a user doesn't change the parameters (date or max result count), repeated clicks of "More info" of the same components shows the stored state of the previous API calls.

## Wikipedia Endpoints Utilized

`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access`

Retrieve the top pageviews for a specific day in YYYY/MM/DD format.

`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=`

Retrieve an article simply by their title since that's all the previous all-access endpoint returns to us.

`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${articleData}/daily/`

Retrieve pageviews for a specific article for a specific time period.

## Caveats

1. AntD, while an incredibly useful pre-built design system, has a lot of styling issues with overrides. I had to both utilize their inline style overrides AND CSS overrides with !important to get the styling I required.

2. Since I wanted to keep this done relatively within the timeframe, the app is not mobile responsive but can easily made to be!

3. Moment JS is being deprecated, so one of their recommended replacements should be used in the future, like Day.js.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

We use the React's testing-library to run some basic tests to see if:

- The app loads
- The API calls work and 100 items initially load
- Utilizing the max results filter works
- A modal pops up with additional information if "More info" is clicked

Caveats:

If wikipedia is down, these tests will fail as they utilize the live API.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
