/* eslint-disable react/prop-types */

import { Input, Space, Slider,Row, Col, InputNumber, Popover, Button } from 'antd';
import { useState } from 'react';
import useNotify from '../hooks/useNotify';

const { Search } = Input;

const PostCodeVal = ({setPaginationData, setCount, type}) => {
  const [inputValue, setInputValue] = useState(1);
  
  const onChange = (newValue) => {
    setInputValue(newValue);
    if(type === 'start') setPaginationData({ postCodeStart: newValue })
    if(type === 'end') setPaginationData({ postCodeEnd: newValue})
    setCount(1)
  };

  return (
    <Row>
      <Col span={12}>
          {
            type === 'start' ? 'Post Code Start' : 'Post Code End'
          } 
        <Slider
          min={1}
          max={9999999999}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={9999999999}
          style={{
            margin: '0 16px',
          }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

const BatteryFilters = ({setCount, setPaginationData}) => {
  const [open, setOpen] = useState(false);
  const handleSuccess = useNotify('success')

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onSearch = (value) => {
    setPaginationData({ query: value })
    setCount(1)
  };
  
  return (
    <Space style={{ paddingLeft: 25, margin: 5}} direction="horizantal">
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Search
            placeholder="Search Name ..."
            allowClear
            onSearch={onSearch}
          />  
        </Col>
      </Row>
       <Popover
      content={
      <div>
        <PostCodeVal setPaginationData={setPaginationData} setCount={setCount} type={'start'}/>
        <PostCodeVal setPaginationData={setPaginationData} setCount={setCount} type={'end'}/> 
      </div>
      }
      title="Filters"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type='dashed'> Apply Filter</Button>
    </Popover>
    <Button  type='dashed' onClick={() => {
      setPaginationData({ limit: 10, offset: 1, pagination: { current: 1 }  })
      setCount(1)
    }}
    > 
      Reset Filters
    </Button>
    </Space>
)
};
export default BatteryFilters;
