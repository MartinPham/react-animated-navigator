# Navigation

* You can use a `Link` component to make an `a` tag, which links to another route.  See [transition sample][1].
```
import {Link} from 'react-animated-navigator';
```
```jsx
<Link to='/page1'>Page 1</Link>
```
* If you want to navigate to another route programmatically, you can use `useNavigator` hook
```
import {useNavigator} from 'react-animated-navigator';
```
```jsx
const [go] = useNavigator()
go('/page1')
```
* or wrap you component with `withNavigator` High-Order-Component
```
import {withNavigator} from 'react-animated-navigator';
```
```jsx
export default withNavigator((props) => {
  return (
    <button onClick={() => props.go('/page1')}>Go Page 1</button>
  )
})
```
  [1]: https://codesandbox.io/s/react-navigator-transition-8bgby