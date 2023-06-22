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

    const [newBrand, setNewBrand] = useState('')

    useEffect(()=>{
        setNewBrand(data[0].brand_name)
    },[])

    return(
        <>
            <div className="col-12">
                <div className="card">
                    <CardHeader title={'edit brand'}/> 
                    <div className="card-body d-flex align-items-center gap-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-6">
                                    <INPUT 
                                        type={'text'} 
                                        text={'brand'} 
                                        value={newBrand} 
                                        Lwidth='20%' 
                                        Iwidth='80%'
                                        onChange={(e)=>{  setNewBrand((c) => c = e.target.value) }} 
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
                                        '/api/manageBrand',
                                         JSON.stringify([{ brand_name:newBrand.toLocaleUpperCase(), status_id:data[0].status_id, id:data[0].id }])
                                        ) 
                                    } 
                            }
                        />
                        <CLINK text={'back'} to={'/brand'}/>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Edit;