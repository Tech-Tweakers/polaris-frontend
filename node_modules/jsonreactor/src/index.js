import React from "react";
import PropTypes from "prop-types";

class JSONReactor extends React.Component {

  static propTypes = {
    /** Data Object to parse and convert to React components */
    data: PropTypes.object.isRequired,
    /** List of components to map against */
    components: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (this.props.data) {
      this.runParse(this.props.data);
    }
  }

  componentWillReceieveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.renderedObject = this.runParse(this.props.data);;       
    }
  }

  runParse(data) {
    if (Array.isArray(data)) {
      this.renderedObject = this.parseObject(data);       
    } else {
      this.renderedObject = Object.keys(data).map(key =>
        this.parseObject({ [key]: data[key] })
      );
    }
  }

  isComponent(obj) {
    return obj.constructor !== String;
  }

  getComponentType(obj) {
    const compType = Object.keys(obj).find(key => this.isComponent(obj[key])); 
    return compType;
  }

  getComponentProps(obj) {

    const props = Object.keys(obj)
      .filter(key => !this.isComponent(obj[key]))
        .reduce((soFar, nextPropKey) => {
          soFar[nextPropKey] = obj[nextPropKey];
          return soFar;
      }, {});

    return props;

  }

  parseObject(obj, index, parent) {

    const ComponentList = this.props.components;
    const componentType = this.getComponentType(obj);

    if (!componentType) return null;

    let props = this.getComponentProps(obj);
    let componentChildren = obj[componentType];

    const isChildrenArray = Array.isArray(componentChildren) ? true : false;
    const isReactComponent = ComponentList[componentType] ? true : false;

    /*
     * If 'children' is an Array, each child gets transformed
     * If 'children' is a single Object and then we just transform that
     */

    const children = (isChildrenArray) 
      ? componentChildren.map((child, index) => this.parseObject(child, index, componentType))
      : this.parseObject(componentChildren, 1, componentType);

    /*
     * destructure parent & child props together if not an Array
     * otherwise just use parent props 
     */
    props = isChildrenArray ? props : { ...props, ...this.getComponentProps(componentChildren) };
    props.key = index ? index : 0;
    props.parent = parent;
    props.nodeName = componentType;

    return React.createElement(
      isReactComponent ? ComponentList[componentType] : componentType,
      props,
      children
    );

  }

  render() {
    return this.renderedObject ? this.renderedObject : false;
  }

}

export default JSONReactor;
