import { useRef } from 'react';

class FormStore {
  constructor() {
    this.store = {}; // 状态库
    this.fieldEntities = []; // 组件实例
    this.callbacks = {}; // 记录回调
  }

  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity);

    return () => {
      this.fieldEntities = this.fieldEntities.filter(
        (_entity) => _entity !== entity
      );
      delete this.store[entity.props.name];
    };
  };

  // getter
  getFieldsValue = () => {
    return { ...this.store };
  };

  getFieldValue = (name) => {
    return this.store[name];
  };

  // setter
  setFieldsValue = (newStore) => {
    const prevStore = Object.assign({}, this.store);

    this.store = {
      ...prevStore,
      ...newStore,
    };

    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  submit = () => {
    // 校验成功 执行onFinish
    // 校验失败 执行onFinishFailed
  };

  validate = () => {
    let err = [];
    // todo 校验
    const store = this.getFieldsValue();
    const fieldEntities = this.fieldEntities;
    fieldEntities.forEach((entity) => {
      let { name, rules } = entity.props;
      let value = this.getFieldValue(name);
      if (rules[0] && (value == null || value.replace(/\s*/, '') === '')) {
        err.push({ name, err: rules[0].message });
      }
    });
    return err;
  };

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  getForm = () => {
    return {
      getFieldsValue: this.getFieldValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      submit: this.submit,
      registerFieldEntities: this.registerFieldEntities,
      validate: this.validate,
      setCallbacks: this.setCallbacks,
    };
  };
}

function useForm(form) {
  const formRef = useRef();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}

export default useForm;
