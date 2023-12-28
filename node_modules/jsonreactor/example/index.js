import React from "react";
import ReactDOM from "react-dom";
import JSONReactor from "../src/index";

import ParaGraph from "./components/ParaGraph";
import { OrderedList, ListItem } from "./components/OrderedList";

const componentTable = {
  paragraph: ParaGraph,
  orderedlist: OrderedList,
  listitem: ListItem
};

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

class JSONReactorExample extends React.Component {
  render() {
    return <JSONReactor data={jsonObject} components={componentTable} />;
  }
}

ReactDOM.render(<JSONReactorExample />, document.getElementById("app-root"));