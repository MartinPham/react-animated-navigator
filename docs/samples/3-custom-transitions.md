# Custom Transition

* With `Link` component, you can specify the transition effect. See [transition sample][1].
```
import {Navigator} from 'react-animated-navigator';
```
```
import styles from "./App.module.scss";
```

- App.module.scss
```scss
$enteringDuration: 400ms;
$exitingDuration: 400ms;

.NavigatorTransitionGroup {
    &.fade-forward, &.fade-back {
        .pageTransition-enter {
            // New page enter - first state
            z-index: 10;
            opacity: 0;
            transition: all $enteringDuration;

            &.pageTransition-enter-active {
                // New page enter - final state
                opacity: 1;
            }
        }

        .pageTransition-exit {
            // Current page exit - first state
            z-index: 1;
            opacity: 1;
            transition: all $exitingDuration;

            &.pageTransition-exit-active {
                // Current page exit - final state
                opacity: 0;
            }
        }
    }
}
```

- App.js
```jsx
<Navigator extraClassNames={styles}>
...
</Navigator>
```



  [1]: https://codesandbox.io/s/react-navigator-transition-sdopq
