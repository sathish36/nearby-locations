This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/909fa99294d2461690bdffb8a1633a86)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gcsns/saleskey-consumer&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/909fa99294d2461690bdffb8a1633a86)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gcsns/saleskey-consumer&amp;utm_campaign=Badge_Coverage)


## for Plugins 
`git submodule update --recursive --init`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

##steps for setting up 
We are using the yarn as dependency management tool.

### `npm install -g node-sass`
install scss dependencies using npm or yarn

### `yarn add enzyme enzyme-adapter-react-16 react-test-renderer`
or
### `npm install --save enzyme enzyme-adapter-react-16 react-test-renderer`
install enzyme for shallow testing of the components in isolation from the child components

**Note: If adding dependency using yarn, then types/enzyme should be added from yarn only.**

### `npm install --save @types/enzyme` 
to support the type definition for enzyme 

### `yarn add --dev cypress`
install cyprus for end-to-end testing

### `yarn add react-router-dom`
install router package for routing

### `yarn add @types/react-router-dom`
install the type definition file for 'react-router-dom'

### `yarn add redux react-redux redux-thunk --save`
install the package for state management in redux

### `yarn add @types/react-redux"`
install the type definition file for 'react-redux'

###project contains 
This project contains all the basic requirements for starting any react project with typescript.

1. node-sass - scss support
2. enzyme , enzyme-adapter-react-16 - snapshot testing with support for integration test
3. cypress - support for end-to-end testing
4. react-router - suuport for routing
5. ant-design - ui toolkit 
6. redux - state management tool
