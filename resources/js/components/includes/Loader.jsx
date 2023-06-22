import { FidgetSpinner } from 'react-loader-spinner'

const Loader = ({spinner}) => {

    return(
        <>
            <div className="loader" style={{ display:spinner?'flex':'none' }}>
                <FidgetSpinner
                    visible={spinner}
                    height="100"
                    width="100"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                    ballColors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                    backgroundColor="#E80000"
                />
                <p>Loading Data...</p>
            </div>
        </>
    )

}

export default Loader;