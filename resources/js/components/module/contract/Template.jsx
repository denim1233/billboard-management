import { useEffect, useState } from 'react';

const Template = () => {

    
    const [terms, setTerms] = useState('');

    const loadTerms = async () => {
        await axios.get('/api/get-terms').then((res)=>{
            setTerms(res.data[0].description)
        })
    }

    useEffect(()=>{
        loadTerms()
    },[])

    return(
        <>
            <div className="col-lg-12 bg-white">

                <div className="container-fluid">
                    <div className="row pb-3" style={{ borderBottom:'1px solid #000' }}>
                        <div className="col-lg-12 print-title d-flex justify-content-between align-items-center px-4">
                            <div className='text-center px-5'>
                                <h1>LEASE CONTRACT <br /> AD SPACE</h1>
                            </div>
                            <ul className='print-ul'>
                                <li>
                                    <img src="http://127.0.0.1:8000/img/deco.png" width='200' alt="" />
                                </li>
                                <li>
                                    <p>Quimpo Boulevard Matina</p>
                                </li>
                                <li>
                                    <p>Davao City 8000 Philippines</p>
                                </li>
                                <li>
                                    <p>Tel Nos (63-82) 296-1821 to 23</p>
                                </li>
                                <li>
                                    <p>Fax No (63-82) 298-0233; (63-82) 297-2023</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-8 print-lessee">

                        <div className="print-field">
                            <p className='legend'>Lessee</p>
                            <p><b>Name:</b> "Benjamin Jolo Navarro" </p>
                            <p><b>Company:</b> "Company of Benjamin Jolo Navarro" </p>
                            <p><b>Contact Nos:</b> "Contact Nos of Benjamin Jolo Navarro" </p>
                            <p><b>Fax Nos:</b> "Fax Nos Benjamin Jolo Navarro" </p>
                        </div>

                        
                        </div>
                        <div className="col-4 my-auto">
                            <div className='border p-2 mb-2 text-danger text-right'>
                                Contact No. "Parent Contract No."
                            </div>
                            <div className='border p-2'>
                                Date: "Date Created"
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <table className='print-table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Brand</th>
                                        <th>Branch</th>
                                        <th>Ad Space</th>
                                        <th>Ad Size</th>
                                        <th># of Pcs</th>
                                        <th>Material</th>
                                        <th>Monthly Rental</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>(Type) Contract #</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>PHP ####</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>(Type) Contract #</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>PHP ####</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colSpan='8'>
                                            <b>Term of Contract:</b>
                                            <p>"Terms of Contract"</p>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colSpan='8'>
                                            <b>Period Covered:</b>
                                            <p>"Period Cover"</p>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colSpan='8'>
                                            <b>Mode of Payment:</b>
                                            <p className='mb-0'>"Mode of Payment"</p>
                                            <p>Total Number of contracts: ## (Nothing Follows)</p>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colSpan='8'>
                                            <b>Remarks:</b>
                                            <p>"Remarks"</p>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="col-lg-12 print-terms mt-2 mb-5 p-3">
                            <div className='p-3' dangerouslySetInnerHTML={{__html: terms}}></div>
                        </div>
                        <div className="col-lg-12 d-flex justify-content-between mb-5 px-5">

                            <div className="print-signature">
                                <p className="name">MS. JINIELLE TAN</p>
                                <p>Corporate Marketing</p>
                                <p>DECOARTS</p>
                            </div>
                            <div className="print-signature">
                                <p>"Name of Lesse"</p>
                                <p>LESSEE</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}

export default Template;