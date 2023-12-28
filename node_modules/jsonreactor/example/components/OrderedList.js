import React from "react";

class OrderedList extends React.Component {
  render() {
    debugger;
    return (
      <ul>
        {this.props.children}
      </ul>
    );
  }
}

class ListItem extends React.Component {

  render() {
    
    return (
      <li>
        {this.props.content ? this.props.content : ""}
      </li>
    );

  }

}

export {
  OrderedList,
  ListItem
};