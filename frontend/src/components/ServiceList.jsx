import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getServices } from '../utils/getApis';

const ServicesList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const columns = [
        {
            title: 'Vehicle',
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (vehicle) => `${vehicle.manufacturer} ${vehicle.model} (${vehicle.year})`,
        },
        {
            title: 'Service Date',
            dataIndex: 'service_date',
            key: 'service_date',
        },
        {
            title: 'Total Price',
            dataIndex: 'total_price',
            key: 'total_price',
        },
    ];

    return <Table dataSource={services} columns={columns} rowKey="id" />;
};

export default ServicesList;
