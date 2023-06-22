import { useState } from 'react';
import {
    CBTN,
    CLINK,
    INPUT,
    CardHeader
} from '../../a_customs/Customs';

import { submitData,setSingleState } from '../../a_customs/Functions';


const Add = () => {

    const [ branch, setBranch ] = useState('')

    return(
        <>
            <div className="col-12">
                <div className="card">
                    <CardHeader title={'add branch'}/> 
                    <div className="card-body d-flex align-items-center gap-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-6">
                                <INPUT type={'text'} text={'branch'} onChange={(e)=>{ setSingleState(e, setBranch) }} Lwidth='20%' Iwidth='80%'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <CBTN text={'save'} onClick={()=>{ submitData( 
                                '/api/manageBranch',
                                JSON.stringify([{id:0,branch_name:branch.toUpperCase(),status_id:1}])
                            ) 
                         }} custom={'mx-5'}/>
                        <CLINK text={'back'} to={'/branch'}/>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Add;