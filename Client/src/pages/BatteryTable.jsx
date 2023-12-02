/* eslint-disable react/prop-types */
import { Table, Tag } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const BatteryTable = ({ setPaginationData, count, setCount}) => {
  const battery = useSelector(st => st.app.battery);

  const dataSource = battery && battery.battries && battery.battries.length > 0 ? battery.battries.map(itm => ({
    ...itm,
    key: itm._id
  })) : []

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: battery?.meta?.offset || 1,
      pageSize: battery?.meta?.limit || 10,
      total: battery?.meta?.total,
      showSizeChanger: true, 
    },
  });


  useEffect(() => {
    if(count === 2) {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          pageSize: battery?.meta?.limit || 10,
          total: battery?.meta?.total,
        },
      });
      setCount(3)
    }
  },[count])

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination: {
        total: battery?.meta?.total,
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      filters,
      ...sorter,
    });
    setPaginationData({
      limit: pagination.pageSize,
      offset: pagination.current
    })
    setCount(1)
  };

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Post Code',
      dataIndex: 'postCode',
      key: 'postCode',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Watt Capacity',
      dataIndex: 'wattCapacity',
      key: 'wattCapacity',
      render: (wattCapacity) => <Tag color={wattCapacity < 7 ? 'volcano' : wattCapacity < 15 ? 'geekblue' : 'green'} >
              {wattCapacity} W
            </Tag>
      ,
    }
  ],[])

  return (
  <Table style={{ marginTop: 10}} columns={columns} dataSource={dataSource} key={'_id'} pagination={tableParams.pagination} onChange={handleTableChange} />
  )
};

export default BatteryTable;
