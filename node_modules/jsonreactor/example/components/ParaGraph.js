import React from "react";

class ParaGraph extends React.Component {
  render() {
    return (
      <p>
        {this.props.content ? this.props.content : ""}
      </p>
    );
  }
}

export default ParaGraph;
