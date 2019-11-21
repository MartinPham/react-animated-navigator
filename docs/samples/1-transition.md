# Transition

* With `Link` component, you can specify the transition effect. See [transition sample][1]
```
import {Link} from 'react-animated-navigator';
```
```jsx
<Link to='/page1' transition='flyLeft'>Page 1</Link>
```
* With `useNavigator` hook
```
import {useNavigator} from 'react-animated-navigator';
```
```jsx
const [go] = useNavigator()
go('/page1', 'flyLeft')
```
* Or with `withNavigator` High-Order-Component
```
import {withNavigator} from 'react-animated-navigator';
```
```jsx
export default withNavigator((props) => {
  return (
    <button onClick={() => props.go('/page1', 'flyLeft')}>Go Page 1</button>
  )
})
```


  [1]: https://codesandbox.io/s/react-navigator-transition-8bgby
