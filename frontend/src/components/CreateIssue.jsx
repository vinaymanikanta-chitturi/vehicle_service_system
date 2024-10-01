import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { createIssue, getVehicles, getComponents } from '../utils/getApis';

const CreateIssue = () => {
    const [form] = Form.useForm();
    const [vehicles, setVehicles] = useState([]);
    const [components, setComponents] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const response = await getVehicles();
            setVehicles(response.data);
        };

        const fetchComponents = async () => {
            const response = await getComponents();
            setComponents(response.data);
        };

        fetchVehicles();
        fetchComponents();
    }, []);

    const onFinish = async (values) => {
        try {
            await createIssue(values);
            message.success('Issue created successfully!');
            form.resetFields();
        } catch (error) {
            message.error('Failed to create issue!');
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Vehicle" name="vehicle" rules={[{ required: true, message: 'Please select a vehicle!' }]}>
                <Select>
                    {vehicles.map((vehicle) => (
                        <Select.Option key={vehicle.id} value={vehicle.id}>
                            {vehicle.manufacturer} {vehicle.model} ({vehicle.year})
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Component" name="component" rules={[{ required: true, message: 'Please select a component!' }]}>
                <Select>
                    {components.map((component) => (
                        <Select.Option key={component.id} value={component.id}>
                            {component.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Issue Description" name="issue_description" rules={[{ required: true, message: 'Please describe the issue!' }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="Is New Component?" name="is_new_component" valuePropName="checked">
                <Input type="checkbox" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Create Issue</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateIssue;
