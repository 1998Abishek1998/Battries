/* eslint-disable react/prop-types */
import { Modal, Spin, Form, Input, Button } from 'antd';
import { useState } from 'react';
import { spinning } from '../utils/configs';
import { getBattries } from '../state/api';
import useNotify from '../hooks/useNotify';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 20, span: 8 },
};

const BatteryModal = ({openModal, setModalOpen, setCount}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleError = useNotify('error');
  const handleSuccess = useNotify('success')

  const onFinish = (value) => {
    setIsLoading(true)
    getBattries({}, value).then((data) => {
      setCount(1)
      handleSuccess(data.message)
      form.resetFields()
      setIsLoading(false)
      setModalOpen(false)
    }).catch(err => {
      handleError(err.message)
      setIsLoading(false)
      setModalOpen(false)
    })
  
  }

  return (
      <Modal 
        title="Create a new Battery"
        open={openModal}
        footer={[]}
        onCancel={() => setModalOpen(false)}
      >
        <Spin spinning={isLoading} style={spinning}>
          <Form form={form} {...layout} colon={false} className="mt-8 small-fonts" onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true, min: 5 }]}>
              <Input type='string'/>
            </Form.Item>
            <Form.Item name="postCode" label="Post Code" rules={[{ required: true }]}>
              <Input type='number' min={100}/>
            </Form.Item>
            <Form.Item name="wattCapacity" label="Watt Capacity" rules={[{ required: true }]}>
              <Input type='number' min={1}/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
  );
};
export default BatteryModal
