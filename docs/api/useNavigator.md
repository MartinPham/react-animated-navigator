# useNavigator

A helper hook to simplify navigation

## Import
```
import {useNavigator} from 'react-animated-navigator';
```

```
const [go, history, location] = useNavigator()
```

## Returns
### go: function(to: string|object|number|function, transition: string?, duration: number?)

- to: See Link's prop [to][1]
- transition: See Link's prop [transition][2]
- duration: See Link's prop [duration][3]

  [1]: Link.md#props
  [2]: Link.md#props
  [3]: Link.md#props

### history: object

A **react-router**'s history object

### location: object

A **react-router**'s current location object