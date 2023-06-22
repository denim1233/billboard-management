import axios from "axios"
import {API} from '../a_custom/ApiServices'


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

export const getDataTable = async (url, setData, setFiltered ) => {

    await axios.get(url).then(({data}) => {
        setData(data)
        setFiltered(data)
    })
}

export const getContractParameters = async (setData) => {

    await axios.get(API.get_contract_parameters).then(({data})=>{
        setData({
            contractNumberList:'',
            lesseeList: data.lesse,
            typeList: data.type,
            brandList: data.brand,
            branchList: data.branch,
            approvalStatusList: data.approvalStatus,
            contractStatusList: data.contractStatus,
            contractTypeList: data.contractType,
            newRenewList: data.newRenew,
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