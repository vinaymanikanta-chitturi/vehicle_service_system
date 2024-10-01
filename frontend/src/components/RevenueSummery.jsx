import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { getRevenue } from '../utils/getApis';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const RevenueSummary = () => {
    const [revenueData, setRevenueData] = useState({ chartData: [] });

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await getRevenue();
                console.log(response.data); // Log the data to see its structure
                setRevenueData(response.data); // Set the response data directly
            } catch (error) {
                console.error('Error fetching revenue:', error);
            }
        };

        fetchRevenue();
    }, []);

    return (
        <>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Daily Revenue" bordered={false}>
                        <p>₹ {revenueData.daily_revenue}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Monthly Revenue" bordered={false}>
                        <p>₹ {revenueData.monthly_revenue}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Yearly Revenue" bordered={false}>
                        <p>₹ {revenueData.yearly_revenue}</p>
                    </Card>
                </Col>
            </Row>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={revenueData.chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="daily_revenue" fill="#8884d8" />
                    <Line type="monotone" dataKey="monthly_revenue" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        </>
    );
};

export default RevenueSummary;
