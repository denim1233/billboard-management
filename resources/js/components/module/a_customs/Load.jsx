import {
    convertDataToOptions
} from './Functions';

export const loadData = async (url, setData, setFilteredData ) => {

    await axios.get(url).then(({data}) => {
        setData(data)
        setFilteredData(data)
    })
}

export const getData = async ( url, setData ) => {
    await axios.get(url).then(({data})=>{
        setData(data)
    })
}

export const findData = async (url , id, setData) => {
    await axios.get(url+id).then(({data}) => {
        setData(data)
    })
}

export const loadParameter = async ( url, setOptions, label, value ) => {
    await axios.get(url).then(({data})=>{
        convertDataToOptions(data, setOptions, label, value)
    })
}

export const loadSizeParam = async (id, setSizeLOV) => {
    await axios.get('/api/getTypeSize/'+id).then(({data}) => {
        let options = data.map((res)=>{
            return {
                label: res.width + ' x ' + res.length + ' ' + res.uom_name,
                value: res.id,
            }
        })
        setSizeLOV(options)
    })
}

export const getCreateParameters = async (setData) => {

    await axios.get('/api/getAllParameter').then(({data})=>{
        setData({
            branchList: data.branch,
            brandList: data.brand,
            typeList: data.type,
            lesseList: data.lesse,
        })
    })

}