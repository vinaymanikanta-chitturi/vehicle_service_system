import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { createService, getVehicles } from '../utils/getApis';

const CreateService = () => {
    const [form] = Form.useForm();
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const response = await getVehicles();
            setVehicles(response.data);
        };

        fetchVehicles();
    }, []);

    const onFinish = async (values) => {
        try {
            await createService(values);
            message.success('Service created successfully!');
            form.resetFields();
        } catch (error) {
            message.error('Failed to create service!');
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
            <Form.Item label="Service Date" name="service_date" rules={[{ required: true, message: 'Please input the service date!' }]}>
                <Input type="date" />
            </Form.Item>
            <Form.Item label="Total Price" name="total_price" rules={[{ required: true, message: 'Please input the total price!' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Create Service</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateService;
