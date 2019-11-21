# Shared Elements

* With `SharedElement` component, you can specify the persistent elements between routes. Navigator will tween it for you. See [full sample][1].
```
import {SharedElement} from 'react-animated-navigator';
```

- First route

```jsx
<SharedElement id="box1">
  <Link
    to="/share2"
    tag="div"
    style={{
      background: "red",
      width: 200,
      height: 100,
      cursor: "pointer",
      display: "inline-block",
      float: "left"
    }}
  />
</SharedElement>
```

- Second route

```jsx
<SharedElement id="box1">
    <div
        style={{
        background: "red",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginLeft: 0,
        zIndex: 1
        }}
    />
</SharedElement>
```

  [1]: https://codesandbox.io/s/react-navigator-transition-sdopq