# Welcome to 2ANI UI ⚡️

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

- Works out of the box. 2ani UI contains a set of polished React components
  that work out of the box.

- Flexible & composable. 2ani UI components are built on top of a React UI
  Primitive for endless composability.

- Accessible. 2ani UI components follows the WAI-ARIA guidelines
  specifications.

- Dark Mode 😍: All components are dark mode compatible.

## Looking for the documentation?

https://ui.ani2am.me/

## Jointly develop the project

https://github.com/fo-nhan/2ani-ui

## Installing 2ani UI

⚡️2ANI UI is made up of multiple components and tools which you can import
one by one. All you need to do is install the `@2ani-ui` package:

```sh
$ yarn add 2ani-ui
# or
$ npm install --save 2ani-ui
```

## Getting set up

To start using the components, please follow these steps:

1. Wrap your application in a `ThemeProvider` provided by **2ani-ui**

```jsx
import { UI2aniContext } from "2ani-ui";

const App = ({ children }) => (
  <UI2aniContext>
    <div>{children}</div>
  </UI2aniContext>
);
```

1. Import `styles` provided by **2ani-ui**

```jsx
import '2ani-ui/src/styles/config.css';

const App = ({ children }) => (
  <UI2aniContext>
    <div>{children}</div>
  </UI2aniContext>
);
```

1. Now you can start using components like so!:

```jsx
import { Button } from "2ani-ui";

const App = () => <Button>I just consumed some 2ANI UI!</Button>;
```
