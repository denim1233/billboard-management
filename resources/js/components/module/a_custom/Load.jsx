import axios from "axios"
import {API} from '../a_custom/ApiServices'

export const filteredData = (data,key,value) => {

    return data.filter((d) => d[key].toLowerCase().match(value.toLocaleLowerCase()))

}

export const loadBoxIconData = async (setData) => {

    await axios.get(API.get_boxIcon_data).then(({data}) => {
        setData({
            submitted:data.submitted,
            modification:data.modification,
            new:data.new,
            renew:data.renew,
            printed_contracts:data.printed
        })
    })

}

export const getData = async ( url, setData ) => {
    await axios.get(url).then(({data})=>{
        setData(data)
    })
}

export const getDataTable = async (url, setData, setFiltered, parameter = null ) => {

    await axios.get(url,parameter).then(({data}) => {
        setData(data)
        setFiltered(data)
    })
}

export const getContractParameters = async (setData) => {

    await axios.get(API.get_contract_parameters).then(({data})=>{
        setData({
            lesseeList: data.lesse,
            typeList: data.type,
            brandList: data.brand,
            branchList: data.branch,
            approvalStatusList: data.approvalStatus,
            contractStatusList: data.contractStatus,
            contractTypeList: data.contractType,
            newRenewList: data.newRenew,
            contractNumber: data.contractNumber,
            parentNumber: data.parentNumber,
        })
    })

}

export const getRenewParameters = async (setData) => {

    await axios.get(API.get_contract_parameters).then(({data})=>{
        setData({
            lesseeList: data.lesse,
            brandList: data.brand,
            branchList: data.branch,
        })
    })

}

export const getCreateParameters = async (setData) => {

    await axios.get(API.get_contract_parameters).then(({data})=>{
        setData({
            branchList: data.branch,
            brandList: data.brand,
            typeList: data.type,
        })
    })

}

export const getSize = async (id, size, setSize) => {
    await axios.get(API.get_size_url+id).then(({data})=>{
        setSize({...size,sizeList:data})
    })
}

export const getLeaseParameters = async (state, setData) => {

    await axios.get(API.get_lease_parameters).then(({data})=>{
        setData({
            ...state,
            lesseeList: data.lesse,
            brandList: data.brand,
            paymentList: data.modeofpayment,
            rentalList: data.rental,
        })
    })

}

export const multiParameters = (url,options,setOptions,name) => {

    axios.get(url).then((res)=>{
        let result = res.data.map((res)=>{
            return {
                label: res[label],
                value: res[value],
            }
        })
        setOptions({...options, [name]:result})
    })

}

export const slotParameters = async (state, setState) => {

    await axios.get(API.get_slot_parameters).then(({data})=>{

        setState({
            ...state,
            branchList:data.branch,
            typeList:data.type,
            statusList:data.status,
            brandList:data.brand
        })

    })

}