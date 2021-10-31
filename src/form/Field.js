import React from 'react';
import FieldContext from './context';

class Field extends React.Component {
  static contextType = FieldContext;

	componentDidMount() {
    // 注册，并拿到取消注册的回调
    this.unregister = this.context.registerFieldEntities(this);
  }

  // 取消事件注册
	componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

	onStoreChange = () => {
    this.forceUpdate();
    console.log('shoud force update');
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
