---
"styled-bettertools": minor
---

add nested paths autocomplete with dot notation:

```ts
// given the following type:
type Props = {
  theme: {
    colors: {
      primary: string;
      secondary: string;
    };
  };
  active: true;
};
// autocomplete will give you the following options:
// theme.colors.primary
// theme.colors.secondary
```
