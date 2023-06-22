import {
    CLINK,
    SearchData,
    LoadDataTable,
    CardHeader,
} from "../../a_customs/Customs";
import { roleColumns } from "../../a_customs/ColumnList";
import { loadData } from "../../a_customs/Load";
import { API } from "../../a_custom/ApiServices";
import { filteredData } from "../../a_customs/Functions";
import { useEffect, useState } from "react";

const Rental = () => {
    const [searchKey, setSearchKey] = useState("");
    const [roleList, setRoleList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        loadData(API.get_role_url, setRoleList, setFilteredList);
    }, []);

    useEffect(() => {
        console.log(searchKey);
        setFilteredList(
            (c) => (c = filteredData(roleList, "role_name", searchKey))
        );
    }, [searchKey]);

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body d-flex align-items-center gap-4">
                        <SearchData
                            custom={"w-50"}
                            value={searchKey}
                            setValue={setSearchKey}
                            hasLabel={false}
                        />

                        <CLINK
                            text="Add Role"
                            to="/account/role/add"
                            custom="ml-auto"
                        />
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <CardHeader title="role" />

                    <div className="card-body">
                        <LoadDataTable
                            columns={roleColumns}
                            data={filteredList}
                            isSelectable={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Rental;
