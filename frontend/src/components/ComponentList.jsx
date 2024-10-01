import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getComponents } from '../utils/getApis';

const ComponentsList = () => {
    const [components, setComponents] = useState([]);

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const response = await getComponents();
                setComponents(response.data);
            } catch (error) {
                console.error('Error fetching components:', error);
            }
        };

        fetchComponents();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Repair Price',
            dataIndex: 'repair_price',
            key: 'repair_price',
        },
        {
            title: 'New Price',
            dataIndex: 'new_price',
            key: 'new_price',
        },
    ];

    return <Table dataSource={components} columns={columns} rowKey="id" />;
};

export default ComponentsList;
