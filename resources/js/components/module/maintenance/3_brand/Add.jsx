import { useState } from 'react';
import {
    CBTN,
    CLINK,
    INPUT,
    CardHeader
} from '../../a_customs/Customs';

import { submitData,setSingleState } from '../../a_customs/Functions';

const Add = () => {

    const [ brand, setBrand ] = useState('') 

    return(
        <>
            <div className="col-12">
                <div className="card">
                    <CardHeader title={'add brand'}/> 
                    <div className="card-body d-flex align-items-center gap-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-6">
                                <INPUT type={'text'} text={'brand'} onChange={(e)=>{ setSingleState(e, setBrand) }} Lwidth='20%' Iwidth='80%'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <CBTN text={'save'} onClick={()=>{ submitData( 
                                    '/api/manageBrand', 
                                    JSON.stringify([{id:0,brand_name:brand.toUpperCase(),status_id:1}])
                                ) 
                            }} custom={'mx-5'}/>
                        <CLINK text={'back'} to={'/brand'}/>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Add;