import React from 'react';
import FieldContext from './context';

class Field extends React.Component {
  static contextType = FieldContext;

	componentDidMount() {
    // 注册
    this.unregister = this.context.registerFieldEntities(this);
  }

	componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

	onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context;
    const { name } = this.props;

    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;

        setFieldsValue({
          [name]: newValue,
        });
      },
    };
  };

  render() {
    console.log('render');
    const { children } = this.props;
    const returnedChildNode = React.cloneElement(
      children,
      this.getControlled()
    );
    return returnedChildNode;
  }
}

export default Field;
