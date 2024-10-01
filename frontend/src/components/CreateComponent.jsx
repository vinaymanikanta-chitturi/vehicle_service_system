import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { createComponent } from '../utils/getApis';

const CreateComponent = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            await createComponent(values);
            message.success('Component created successfully!');
            form.resetFields();
        } catch (error) {
            message.error('Failed to create component!');
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the component name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Repair Price" name="repair_price" rules={[{ required: true, message: 'Please input the repair price!' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item label="New Price" name="new_price" rules={[{ required: true, message: 'Please input the new price!' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Create Component</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateComponent;
