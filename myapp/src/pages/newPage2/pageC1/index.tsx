import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import './index.less';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const DynamicFieldSet = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        // console.log(form)
    }, [])

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    const addItemCallback = async (add: any) => {
        const values = await form.validateFields()
        console.log(values)
        add()
    }

    return (
        <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish} form={form} autoComplete="off">
            <Form.List
                name="names"
                initialValue={['']}
                rules={[
                    {
                        validator: async (_, names): Promise<any> => {
                            if (!names || names.length < 1) {
                                return Promise.reject(new Error('至少填写一个客服电话'));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? '客服电话' : ''}
                                required={true}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "请填写客服电话",
                                        },
                                        {
                                            pattern: /^((\(\d{3,4}\)|\d{3,4}-|\s){1,2}(\d{7,8}|\d{3,4})$)|([1][3,4,5,6,7,8,9][0-9]{9})$/,
                                            message: '电话格式错误！'
                                        }
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="请输入客服电话" style={{ width: '60%' }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                                {
                                    (fields.length - 1 === index) ? (<PlusSquareOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => addItemCallback(add)}
                                    />) : null
                                }

                            </Form.Item>
                        ))}
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DynamicFieldSet


{/* <Form name="dynamic_form_item" {...layout} onFinish={onFinish} form={form} autoComplete="off">
            <Form.List
              name="names"
              initialValue={['']}
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(new Error('至少填写一个客服电话'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item

                      label='客服电话'
                      required={true}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "请填写客服电话",
                          },
                          {
                            pattern: /^((\(\d{3,4}\)|\d{3,4}-|\s){1,2}(\d{7,8}|\d{3,4})$)|([1][3,4,5,6,7,8,9][0-9]{9})$/,
                            message: '电话格式错误！'
                          }
                        ]}
                        noStyle
                      >
                        <Input placeholder="请输入客服电话" style={{ width: '60%' }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className={style['dynamic-delete-button']}
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                      {
                        (fields.length - 1 === index) ? (<PlusSquareOutlined
                          className={style['dynamic-delete-button']}
                          onClick={() => addItemCallback(add)}
                        />) : null
                      }

                    </Form.Item>
                  ))}
                </>
              )}
            </Form.List>
          </Form> */}