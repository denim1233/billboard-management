import axios from "axios";
import { parse } from "date-fns";

export const setReactSelectState = (selected, action, state, setState) => {
    if (selected === null) {
        setState({ ...state, [action.name]: "" });
    } else {
        setState({ ...state, [action.name]: selected.value });
    }
};

export const setSingleObjState = (e, state, setState) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
};

export const setSingleState = (e, setState) => {
    setState((c) => (c = e.target.value));
};

export const submitData = async (url, data) => {
    await axios({
        method: "post",
        url: url,
        data: JSON.parse(data),
    }).then((res) => {
        toast.fire({
            icon: "success",
            title: "Added Successfully!",
        });
    });
};

export const convertDataToOptions = (list, setOptions, label, value) => {
    let data = [...list];
    let options = data.map((res) => {
        return {
            label: res[label],
            value: res[value],
        };
    });
    setOptions(options);
};

export const filteredData = (data, key, value) => {
    // console.log(data);
    // return;
    return data.filter((d) =>
        d[key].toLowerCase().match(value.toLocaleLowerCase())
    );
};

export const deactivateData = (url, data) => {
    Swal.fire({
        title: "Do you want to proceed?",
        icon: "warning",
        showCancelButton: true,
        iconColor: "#e80000",
        confirmButtonColor: "#e80000",
        cancelButtonColor: "#e80000",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
    }).then(async (result) => {
        if (result.isConfirmed) {
            let parseData = JSON.parse(data).map((res) => {
                return { ...res, status_id: res.status_id == 1 ? 2 : 1 };
            });
            await axios({
                method: "post",
                url: url,
                data: parseData,
            }).then((res) => {
                toast.fire({
                    icon: "success",
                    title: "Updated Successfully!",
                });
            });
        }
    });
};

// ===== Slot

export const updateSelectState = (
    selected,
    action,
    searchData,
    setSearchData,
    setTypeID
) => {
    if (selected === null) {
        setSearchData({ ...searchData, [action.name]: "" });
    } else {
        if (action.name == "type_name") {
            setTypeID(selected.value);
        }
        setSearchData({ ...searchData, [action.name]: selected.label });
    }
};

export const handleSearchBtn = (slotList, searchData, setFilteredList) => {
    let result = slotList?.filter((d) => {
        if (
            searchData.branch_name == "" &&
            searchData.status_name == "" &&
            searchData.type_name == "" &&
            searchData.size == ""
        ) {
            return d;
        }
        if (
            d.branch_name == searchData.branch_name ||
            d.status_name == searchData.status_name ||
            d.type_name == searchData.type_name ||
            d.size == searchData.size
        ) {
            return d;
        }
    });
    setFilteredList(result);
};

export const handleSelectedRow = (e, setSelectedSlot) => {
    let selected = e.selectedRows;
    let data = selected.map((d) => {
        return {
            id: d.id,
            status_id: d.status_id == 4 ? 2 : 4,
        };
    });
    setSelectedSlot(data);
};

export const openRemarkBox = (selectedSlot, setIsDelete) => {
    if (selectedSlot.length > 0) {
        setIsDelete(true);
    }
};

export const submitDelete = async (remarks, selectedSlot) => {
    if (remarks !== "") {
        const formData = {
            id: selectedSlot.map((r) => r.id).toString(),
            status_id: selectedSlot.map((r) => r.status_id).toString(),
            remarks: remarks,
            deleted_by: "cobra",
            deleted_at: "pepsi",
        };
        console.log(formData);
    } else {
        alert("remarks required!!!");
    }
};

// ===== Slot
