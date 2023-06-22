const Sticky = () => {

    return(
        <>
            <div className="col-12" style={{ height:'100vh' }}></div>
            <nav className="border w-100 " style={{ position:'sticky',marginTop:'100px'}}>
                second header
            </nav>
            <div className="col-12" style={{ height:'100vh' }}></div>
        </>
    )

}

export default Sticky;