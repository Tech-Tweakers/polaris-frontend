<div align="center">
  <img src="https://user-images.githubusercontent.com/19170080/30990752-688690d2-a470-11e7-990e-3f39105a58bf.jpg" />
</div>

# JSON Reactor - JSON to REACT

[![Build Status](https://travis-ci.org/gregnb/jsonreactor.svg?branch=master)](https://travis-ci.org/gregnb/jsonreactor)
[![dependencies Status](https://david-dm.org/gregnb/jsonreactor/status.svg)](https://david-dm.org/gregnb/jsonreactor)
[![npm version](https://badge.fury.io/js/jsonreactor.svg)](https://badge.fury.io/js/jsonreactor)

Transform simple or nested JSON objects during run time into React Components 


## Install

`npm install jsonreactor --save-dev `

## Demo

[![Edit jsonreactor](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1qxj58vnpl)

## Usage

Inside of your React component, after you recieve your JSON payload you can transform them into React components in the following manner:

#### Step 1: Define your Component map
```js

import ParaGraph from "./yourComponentLibrary/ParaGraph";
import { OrderedList, ListItem } from "./yourComponentLibrary/OrderedList";

const componentTable = {
  paragraph: ParaGraph,
  orderedlist: OrderedList,
  listitem: ListItem
};

```

#### Step 2: Call JSONReactor component

Now pass your object data to JSONReactor along with the componentTable mapping. For example, say you received JSON that looked like this object:

```js
const jsonObject = {
  paragraph: {
    content: "here is some content to display!"
  },
  orderedlist: [
    {
      listitem: {
        content: "test #1"
      }
    },
    {
      listitem: {
        content: "test #2"
      }
    },
    {
      listitem: {
        content: "test #3"
      }
    }
  ]
};
```

You can now call JSONReactor:

```js
class JSONReactorExample extends React.Component {
  render() {
    return <JSONReactor data={jsonObject} components={componentTable} />;
  }
}
```

