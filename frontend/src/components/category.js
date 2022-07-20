import { Descriptions } from 'antd';
import { homeCategoryDescription } from '../constants/constants';
import LineItem from './line-item'

const Category = (props) => {
    const subcategories = props.subcategories;

    const description = props.category === 'House'
        ? <Descriptions size='small' className="instructions" labelStyle={{ 'background': 'transparent' }}>
            <Descriptions.Item contentStyle={{ 
                'background': 'transparent',
                'fontStyle': 'italic',
                'fontzweight': '400',
                'color': '#474747'
            }}>{homeCategoryDescription}</Descriptions.Item>
        </Descriptions> 
        : <></>

    return (
        <>
            {description}
            {Object.keys(subcategories).map((subcategory, index) => {
                const data = subcategories[subcategory];
                return(
                    <LineItem label={subcategory} key={index} data={data} subcategories={subcategories} setData={props.setData}></LineItem>
                )
            })}
        </>
    );
};

export default Category;
