import DataTable from "react-data-table-component";
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom";



export const LoadDataTable = ({ 
    data, 
    columns, 
    selectableRows=true, 
    onSelectedRowsChange, 
    selectableRowsSingle=true, 
}) => {

    return(

            <DataTable
                fixedHeaderScrollHeight="450px"
                selectableRowsRadio="radio"
                selectableRowsHighlight
                highlightOnHover
                pointerOnHover
                pagination
                striped
                dense
                data={data}
                columns={columns}
                selectableRows={selectableRows}
                selectableRowsSingle={selectableRowsSingle}
                selectableRowsNoSelectAll={selectableRowsSingle}
                onSelectedRowsChange={ onSelectedRowsChange }
            />
    )

}


export const BoxIcon = ({title, icon, value}) => {

    return(
        <div className="col-lg-2 col-md-4">
            <div className="small-box bg-defualt shadow">
                <div className="inner">
                    <h3>{value}</h3>
                    <p className='text-uppercase lead'>{title}</p>
                </div>
                <div className="icon">
                    {icon}
                </div>    
            </div>
        </div>
    )

}

export const CardHeader = ({title}) => {
    return(
        <div className="card-header text-light" style={{background: '#E80000'}}>
            <h3 className="card-title mb-0 text-uppercase">{title}</h3>
        </div>
    )
}


export const CBTN = ({text, onClick, custom=''}) => {

    return (
        <button type='button' className={'custom-btn '+custom} onClick={onClick}>
            {text}
        </button>
    )

}

export const CLINK = ({text, to, custom=''}) => {

    return (
        <Link  className={'custom-btn '+custom} to={to}>{text}</Link>
    )

}



export const INPUT = ({type, name, text,value, custom='', onChange, Lwidth='40%', Iwidth='60%', isRO=false}) => {

    return(
        <div className={"form-group d-flex align-items-center "+custom}>
            <div style={{ width: Lwidth }}>
                <label className="text-uppercase">{text}</label>
            </div>
            <div style={{ width:Iwidth }}>
                <input type={type} name={name} value={value} className="form-control text-uppercase" onChange={onChange} readOnly={isRO}/>
            </div>
        </div>
    )

}




export const LOV = ({
    name, 
    text, 
    value, 
    options, 
    opValue, 
    opLabel, 
    onChange, 
    Lwidth='40%', Iwidth='60%'
}) => {

    return(
        <div className="form-group d-flex align-items-center">
            <div style={{ width:Lwidth }}>
                <label className="text-uppercase">{text}</label>
            </div>
            <div style={{ width: Iwidth }}>
                <select name={name} value={value} onChange={onChange} className='form-control'>
                    <option value=""></option>
                    {
                        options?.map((res)=>{
                            return(
                                <option key={res[opValue]} value={res[opValue]} >{res[opLabel]}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )

}






export const SEARCHDATA = ({ 
    isEdit = false,
    text,
    name,
    state,
    value,
    getVal,
    setState,
    resultList, 
    searchKey,
    Lwidth='40%', 
    Iwidth='60%'
}) => {

    const [filtered, setFiltered] = useState([])
    const [skey, setSkey] = useState('')

    const handleSearch = (e) => {

        const {value} = e.target

        if(value.length > 1){
            let result = resultList.filter((d)=>d[searchKey].toLowerCase().includes(value.toLowerCase()))
            setFiltered(result)
        }else{
            setFiltered([])
            setState({...state,[name]:''})
        }
        setSkey(c=>c=value)
    }

    const handleSetValue = (e) => {
        setSkey(e.target.innerText)
        setState({...state,[name]:e.target.classList.value})
        setFiltered([])
    }

    const clearAll = ()=> {
        setSkey('')
        setFiltered([])
        setState({...state,[name]:''})
    }

    useEffect(()=>{
        if(value!=='' && value != ''){
            let a = []
            resultList?.filter((d)=>{
                if(d.id==value){
                    a.push(d[searchKey])
                }
            })
            if(isEdit){
                setSkey(a)
                console.log('test')
            }
        }

        if(value==''){
            setSkey('')
        }

    },[value])

    

    return(
        <div className={"form-group d-flex align-items-center "}>
            <div style={{ width: Lwidth }}>
                <label className="text-uppercase">{text}</label>
            </div>
            <div style={{ width:Iwidth }} className='div-search-input'>
                <input type='text' className="form-control text-uppercase" value={skey} onChange={handleSearch}/>
                {
                    (filtered.length>0 || skey!='')
                    ?(<i className="fas fa-times search-input-icon" onClick={clearAll}></i>)
                    :(<i className="fas fa-search search-input-icon"></i>)
                }

                <ul className='search-ul-result' style={{border:(filtered.length>0)?'1px solid #ccc':'none'}}>
                    {
                        filtered?.map((d)=>{
                            return(
                                <li key={d.id} className={d[getVal]} onClick={handleSetValue} >{d[searchKey]}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export const SEARCHDATANUMBER = ({ 
    isEdit = false,
    text,
    name,
    state,
    value,
    getVal,
    setState,
    resultList, 
    searchKey,
    Lwidth='40%', 
    Iwidth='60%'
}) => {

    const [filtered, setFiltered] = useState([])
    const [skey, setSkey] = useState('')

    const handleSearch = (e) => {

        const {value} = e.target

        if(value.length > 0){
            let result = resultList.filter((d)=>d[searchKey] == value)
            setFiltered(result)
        }else{
            setFiltered([])
            setState({...state,[name]:''})
        }
        setSkey(c=>c=value)
    }

    const handleSetValue = (e) => {
        setSkey(e.target.innerText)
        setState({...state,[name]:e.target.classList.value})
        setFiltered([])
    }

    const clearAll = ()=> {
        setSkey('')
        setFiltered([])
        setState({...state,[name]:''})
    }

    useEffect(()=>{
        if(value!=='' && value != ''){
            let a = []
            resultList?.filter((d)=>{
                if(d.id==value){
                    a.push(d[searchKey])
                }
            })
            if(isEdit){
                setSkey(a)
                console.log('test')
            }
        }

        if(value==''){
            setSkey('')
        }

    },[value])

    

    return(
        <div className={"form-group d-flex align-items-center "}>
            <div style={{ width: Lwidth }}>
                <label className="text-uppercase">{text}</label>
            </div>
            <div style={{ width:Iwidth }} className='div-search-input'>
                <input type='text' className="form-control text-uppercase" value={skey} onChange={handleSearch}/>
                {
                    (filtered.length>0 || skey!='')
                    ?(<i className="fas fa-times search-input-icon" onClick={clearAll}></i>)
                    :(<i className="fas fa-search search-input-icon"></i>)
                }

                <ul className='search-ul-result' style={{border:(filtered.length>0)?'1px solid #ccc':'none'}}>
                    {
                        filtered?.map((d)=>{
                            return(
                                <li key={d.id} className={d[getVal]} onClick={handleSetValue} >{d[searchKey]}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
