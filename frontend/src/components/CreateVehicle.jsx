import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { createVehicle } from '../utils/getApis';

const CreateVehicle = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            await createVehicle(values);
            message.success('Vehicle created successfully!');
            form.resetFields();
        } catch (error) {
            message.error('Failed to create vehicle!');
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Model" name="model" rules={[{ required: true, message: 'Please input the vehicle model!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Manufacturer" name="manufacturer" rules={[{ required: true, message: 'Please input the manufacturer!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Year" name="year" rules={[{ required: true, message: 'Please input the vehicle year!' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Create Vehicle</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateVehicle;
