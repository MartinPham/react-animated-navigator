# Link

Provides an easy way to navigation between routes

## Import
```jsx
import {Link} from 'react-animated-navigator';
```

## Props
### to: string

A string representation of the Link location, created by concatenating the location's pathname, search, and hash properties.

```jsx
<Link to="/page1?name=value#hash" />
```

### to: number
You can navigate back or forward to the routes inside Navigator stacks. 
Examples:

- Go back
```jsx
<Link to={-1} />
```

- Go forward
```jsx
<Link to={1} />
```

- Go back 2 steps
```jsx
<Link to={-2} />
```

### to: object

An object that can have any of the following properties:

- `pathname`: A string representing the path to link to.
- `search`: A string representation of query parameters.
- `hash`: A hash to put in the URL, e.g. `#a-hash`.
- `state`: State to persist to the `location`.

```jsx
<Link
  to={{
    pathname: "/page1",
    search: "?name=value",
    hash: "#hash",
    state: { param1: 'value1' }
  }}
/>
```

### to: function

A function to which current location is passed as an argument and which should return location representation as a string or as an object

```jsx
<Link to={location => ({ ...location, pathname: "/page1" })} />
```

```jsx
<Link to={location => `${location.pathname}?key=name`} />
```

### transition: string?

Transition name. Currently, there are built-in transitions:

- flyLeft
- flyRight
- flyUp
- flyDown
- slideLeft
- slideRight
- slideUp
- slideDown
- flipLeft
- flipRight
- flipUp
- flipDown

Or you can provide your custom transition name.

### duration: number?

Transition duration

### tag: string? (default: "a")

Specify HTML tag you want to render.
