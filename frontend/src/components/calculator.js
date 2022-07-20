import { Card, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import Category from './category';
import { houseCategories, travelCategories, tabList } from '../constants/constants';


export async function fetchData(endpoint, data, setterFuncion) {
    const response = await fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const res = await response.json();
    setterFuncion(res);
}


const Calculator = () => {
    const [activeTabKey, setActiveTabKey] = useState('House');
    const onTabChange = (key) => {
        setActiveTabKey(key);
    };


    const [houseData, setHouseData] = useState(houseCategories);
    useEffect(() => {
        fetchData('house', houseData, setHouseData);
    }, [JSON.stringify(houseData)]);


    const [travelData, setTravelData] = useState(travelCategories);
    useEffect(() => {
        fetchData('travel', travelData, setTravelData);
    }, [JSON.stringify(travelData)]);


    const [total, setTotal] = useState(0);
    useEffect(() => {
        fetchData('calculate', {...houseData, ...travelData}, setTotal);
    });


    const contentList = {
        House: <Category category="House" subcategories={houseData} setData={setHouseData}></Category>,
        Travel: <Category category="Travel" subcategories={travelData} setData={setTravelData}></Category>
    };

    return (
         <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        >
            <Card
                style={{ width: '100%' }}
                title="Personal Carbon Footprint Calculator"
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={key => {
                    onTabChange(key);
                }}
                className="primary"
            >
                {contentList[activeTabKey]}
            </Card>
            <br/>
            <br/>
            <Card
                title="Total Carbon Footprint"
                style={{ 'fontSize': '17px', 'fontWeight': '700' }}
                className="output"
            >
                {total} kg annual CO₂ emissions
            </Card>
        </Form>
    );
};

export default Calculator;
