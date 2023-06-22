
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    CBTN,
    CLINK,
    INPUT,
    CardHeader
} from '../../a_customs/Customs';

import {
    submitData
} from '../../a_customs/Functions';


const Edit = () => {

    const { params } = useParams()

    const data = JSON.parse(params)

    const [newBranch, setNewBranch] = useState('')

    useEffect(()=>{
        setNewBranch(data[0].branch_name)
    },[])

    return(
        <>
            <div className="col-12">
                <div className="card">
                    <CardHeader title={'edit branch'}/> 
                    <div className="card-body d-flex align-items-center gap-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-6">
                                <INPUT 
                                    type={'text'} 
                                    text={'branch'} 
                                    Lwidth='20%' 
                                    Iwidth='80%'
                                    value={newBranch}
                                    onChange={(e)=>{  setNewBranch((c) => c = e.target.value) }} 
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <CBTN 
                            text={'save'} 
                            custom={'mx-5'}
                            onClick={ () => { 
                                    submitData(
                                        '/api/manageBranch',
                                        JSON.stringify([{ branch_name:newBranch.toLocaleUpperCase(), status_id:data[0].status_id, id:data[0].id }])
                                    ) 
                                } 
                            }
                        />
                        <CLINK text={'back'} to={'/branch'}/>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Edit;