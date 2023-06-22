import { useEffect, useState } from 'react';
import {
    LoadDataTable,
    CardHeader,
} from '../../a_customs/Customs';

import {
    loadData
} from '../../a_customs/Load'


const handleChange = (e) => {

    console.log(e)
    
}


export const slotColumns = [

    {
        name:'SLOT NUMBER',
        selector: (row) => row.slot_number,
        sortable:true,
        
    },
    {
        name:'BRANCH',
        selector: (row) => row.branch_name,
        sortable:true,
    },
    {
        name:'TYPE',
        selector: (row) => row.type_name,
        sortable:true,
    },
    {
        name:'SIZE',
        selector: (row) => row.size,
        sortable:true
    },
    {
        name:'BRAND',
        selector: (row) => row.brand_name,
        sortable:true,
    },
    {
        name:'SLOT STATUS',
        selector: (row) => row.status_name,
        sortable:true,
    }
]

const Test = () => {

    const [slotList, setSlotList] = useState([])
    const [filteredList, setFilteredList] = useState([])

    useEffect(()=>{
        loadData('/api/getSlot',setSlotList, setFilteredList);
    },[])


    return(
        <>



            <div className="col-12">
                <div className="card">
                    
                    <CardHeader title='contracts' />
                    
                    <div className="card-body">
                        <LoadDataTable 
                            columns={slotColumns} 
                            data={filteredList} 
                            
                        />
                    </div>

                </div>
                
            </div>
        </>
    )

}

export default Test;