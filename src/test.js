import React, { useEffect } from 'react';
import Form, { Field } from './form';
import Input from './input';

const nameRules = { required: true, message: '请输入姓名！' };
const passwordRules = { required: true, message: '请输入密码！' };

export default function DownzooRcFieldForm(props) {
  const [form] = Form.useForm();

  const onFinish = (val) => {
    console.log('onfinish', val);
  };

  const onFinishFailed = (val) => {
    console.log('onFinishFailed', val);
  };

  useEffect(() => {
    console.log('form', form);
  }, [form]);

  return (
    <div>
      <h3>DownzooRcFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="input your username" />
        </Field>
        <Field name="password" rules={[passwordRules]}>
          <Input placeholder="input UR Password" />
        </Field>
        <button>Submit</button>
      </Form>
    </div>
  );
}
