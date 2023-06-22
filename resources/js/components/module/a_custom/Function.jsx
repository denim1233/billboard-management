export const submitData = async (url, data, navigate, path) => {
    await axios({
        method: "post",
        url: url,
        data: JSON.parse(data),
    })
        .then((res) => {
            toast.fire({
                icon: "success",
                title: "Added Successfully!",
            });
            navigate(path);
        })
        .catch((error) => {
            console.log(error);
            toast.fire({
                icon: "error",
                title: "Record Already Exist!",
            });
        });
};
