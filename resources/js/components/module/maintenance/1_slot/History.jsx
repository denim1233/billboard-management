import { useState, useEffect } from 'react';

import {API} from '../../a_custom/ApiServices'

import {slotHistoryColumns} from '../../a_custom/ColumnList';

import {
    LoadDataTable,
    CardHeader,
} from '../../a_custom/Custom';

import {
    slotParameters,
    getDataTable
} from '../../a_custom/Load'

const History = () => {

    const [slotList, setSlotList] = useState([])
    const [filteredList, setFilteredList] = useState([])

    useEffect(()=>{
        
        const param = {
            params: {status_id: 2}
          };

        getDataTable(API.get_slot_url,setSlotList,setFilteredList,param)
    },[])

    return(
        <div className="col-12">
            <div className="card">
                
                <CardHeader title='slot history' />
                
                <div className="card-body">
                    <LoadDataTable 
                        columns={slotHistoryColumns} 
                        data={filteredList} 
                        selectableRows={false}
                    />
                </div>
                
            </div>
        </div>
    )

}

export default History;