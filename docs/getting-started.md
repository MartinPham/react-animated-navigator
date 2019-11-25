# Getting started

## Requirements
* React Animated Navigator is an extension for `react-router`, so you must use it with `react-router`

## Add Package

* For npm
```bash
npm i react-animated-navigator react-router
```

* For yarn
```bash
yarn add react-animated-navigator react-router
```

## Integration

* Creating `history` object
```jsx
import {createBrowserHistory as createHistory} from 'history';
```

```js
const historyObject = createHistory()
```

* Wrap your application with `Router` component
```jsx
import {Router} from 'react-router';
```

```jsx
<Router history={historyObject}>
...
</Router>
```

* Wrap your routes with `Navigator` component
```jsx
import {Route} from 'react-router';
import {Navigator} from 'react-animated-navigator';
```

```jsx
<Navigator
	defaultDuration={400}
>
	<Route
		exact
		path="/page1"
		component={Page1}
	/>
	<Route
		exact
		path="/page2"
		component={Page2}
	/>
  ...
</Navigator>
```

## Navigation

- See [Navigation][1]

  [1]: /samples/0-navigation