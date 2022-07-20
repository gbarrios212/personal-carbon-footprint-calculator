import {
    Form,
    InputNumber,
    Descriptions,
    Tooltip
} from 'antd';


const Wrapper = ({ data, children }) => ( data.average ?
        <Tooltip 
            title={`${data.average} kilograms of CO₂ is about average for a household of one person over a year.`} color="gold" placement="right"
            trigger={['hover', 'focus']}
        >
            {children}
        </Tooltip>: children
    );


const LineItem = (props) => {
    function onChange(val) {
        const subcategory = {
            [props.label]: {
                input: val,
                carbonValue: props.data.carbonValue,
                unit: props.data.unit,
                average: props.data.average
            }
        }
        props.setData(
            Object.assign({
                ...props.subcategories,
                ...subcategory
            })
        )
    }

    return (
        <Form.Item label={props.label}>
            <Wrapper data={props.data}>
                <InputNumber 
                    addonAfter={props.data.unit}
                    min={0}
                    max={Number.MAX_SAFE_INTEGER}
                    defaultValue={0}
                    onChange={onChange}
                    value={props.data.input}
                    />
                <Descriptions bordered size='small'>
                    <Descriptions.Item contentStyle={
                        props.data.average && 
                        props.data.average < props.data.carbonValue && 
                        {'color': 'red'}}
                    >{props.data.carbonValue} kg CO₂/yr</Descriptions.Item>
                </Descriptions>
            </Wrapper>
        </Form.Item>
    );
};

export default LineItem;
