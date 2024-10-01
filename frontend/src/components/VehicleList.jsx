import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getVehicles } from '../utils/getApis';

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await getVehicles();
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const columns = [
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
    ];

    return <Table dataSource={vehicles} columns={columns} rowKey="id" />;
};

export default VehiclesList;
