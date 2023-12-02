import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { getBattries } from '../state/api'
import PageHeader from '../components/PageHeader'
import PageLayout from '../components/PageLayout'
import { setBattries } from '../state/appSlice'
import BatteryTable from './BatteryTable';
import BatteryModal from './BatteryModal';
import BatteryFilters from './BatteryFilter';
import useNotify from '../hooks/useNotify';

const Battery = () => {
  const [paginationData, setPaginationData] = useState({
    limit: 10,
    offset: 1
  })
  const [openModal, setModalOpen] = useState(false)
  const [count, setCount] = useState(1)
  const dispatch =  useDispatch() 
  const battery = useSelector(st => st.app.battery);
  const handleError = useNotify('error');

  useEffect(() => {
    if(count === 1) {
      getBattries(paginationData, {})
      .then(data => {
          dispatch(setBattries(data.data))
          setCount(2)
        })
        .catch(err => {
          handleError(err.message)
        })
    }
  },[paginationData, count])

  return (
    <>      handleSuccess()

      {
        battery && <>
          <PageHeader
            title='Battery Details'
            footer={<div >
              <span>
                Average Watt Capacity: <b className=''>{battery?.totalData?.averageWattCapacity}</b>,  
                Total Watt Capacity: <b className=''>{battery?.totalData?.totalWattCapacity}</b>,  
                Battries: <b>{battery?.meta?.total}</b>
              </span>
            </div>}
            noFooterBackground={true} 
            action={ <div className="flex mt-2">
            <Button onClick={() => setModalOpen(true)} > + Add Battery </Button>
          </div>}    
          />
          <PageLayout>
            <BatteryFilters setCount={setCount} paginationData={paginationData} setPaginationData={setPaginationData}/>
            <BatteryTable setCount={setCount} count={count} setPaginationData={setPaginationData} />
            <BatteryModal openModal={openModal} setModalOpen={setModalOpen} setCount={setCount}/>
          </PageLayout>
        </>
      }
    </>
  )
}

export default Battery
