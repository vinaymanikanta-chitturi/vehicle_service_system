import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getIssues } from '../utils/getApis';

const IssuesList = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await getIssues();
                setIssues(response.data);
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();
    }, []);

    const columns = [
        {
            title: 'Vehicle',
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (vehicle) => `${vehicle.manufacturer} ${vehicle.model} (${vehicle.year})`,
        },
        {
            title: 'Component',
            dataIndex: 'component',
            key: 'component',
            render: (component) => component.name,
        },
        {
            title: 'Description',
            dataIndex: 'issue_description',
            key: 'issue_description',
        },
        {
            title: 'New Component',
            dataIndex: 'is_new_component',
            key: 'is_new_component',
            render: (text) => (text ? 'Yes' : 'No'),
        },
    ];

    return <Table dataSource={issues} columns={columns} rowKey="id" />;
};

export default IssuesList;
