import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { RADIUS_OF_EARTH } from '../../constants';

import './search-form.scss';

export default function SearchForm({
    reset,
    searchPartners,
}: {
    searchPartners: (radius: number, long: number, lat: number, offset: number) => Promise<void>;
    reset: () => void;
}) {
    const [form] = Form.useForm();
    const { Option } = Select;

    const locations = [
        {
            coordinates: '51.5144636,-0.142571',
            label: 'Starbucks Cafe Central London',
        },
    ];

    form.setFieldsValue({
        location: locations[0],
    });
    const options = locations.map((d, index) => (
        <Option key={index + 1} value={d.coordinates}>
            {d.label}
        </Option>
    ));

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };

    const onFinish = () => {
        const redius = form.getFieldValue('radius');
        const location = form.getFieldValue('location');
        const coords = location.coordinates.split(',');
        searchPartners(redius, parseFloat(coords[0]), parseFloat(coords[1]), 0);
    };

    const onReset = () => {
        form.resetFields();
        reset();
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="location" label="Meeting place" rules={[{ required: true }]}>
                <Select placeholder="Select a place" showSearch={true} defaultActiveFirstOption={true}>
                    {options}
                </Select>
            </Form.Item>
            <Form.Item name="radius" label="Radius" rules={[{ required: true }, { min: 0 }, { max: RADIUS_OF_EARTH }]}>
                <Input type="number" placeholder="Enter kilometers" />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" className="submit-btn" htmlType="submit">
                    Search
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
}
