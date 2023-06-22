import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import axios from "axios";

const Terms = () => {
    const [description, setDescription] = useState("");

    const [terms, setTerms] = useState("");

    const saveTerms = async (description) => {
        await axios({
            method: "post",
            url: "/api/edit-terms",
            data: { description: description },
        }).then((res) => {
            toast.fire({
                icon: "success",
                title: "Save Successfully!",
            });
            loadTerms();
        });R
    };

    const loadTerms = async () => {
        await axios.get("/api/get-terms").then((res) => {
            setTerms(res.data[0].description);
        });
    };

    useEffect(() => {
        loadTerms();
    }, []);

    return (
        <>
            <div className="col-lg-12">
                <div className="card border-0">
                    <div className="card-header bg-white border-0">
                        <h3 className="mb-0">Terms & Conditions</h3>
                    </div>
                    <div className="card-body">
                        <CKEditor
                            editor={ClassicEditor}
                            data={terms}
                        
                            onReady={(editor) => {}}
                            onChange={(event, editor) => {
                                const data = editor?.getData();
                                setDescription(data);
                            }}
                            onBlur={(event, editor) => {}}
                            onFocus={(event, editor) => {}}
                        />

                        <div className="py-4">
                            <button
                                className="custom-btn"
                                onClick={() => {
                                    saveTerms(description);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Terms;
