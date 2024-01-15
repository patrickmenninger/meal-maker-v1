import { createSearchParams, useLocation, useNavigate } from "react-router-dom"


const Filter = ( {updateParams, params} ) => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleCheck = ( cookTime ) => {

        updateParams({
            ...params,
            cookTime: params.cookTime + "_" + cookTime
        })

    }

    return (
        <>    
        <h3>
            Filter
        </h3>
            <div className="filter-cats">
                Cook time
            </div>
            <div>
                <ul className="filter-list">
                    <li>
                        <input type="checkbox" onChange={() => handleCheck("0-30")}></input>
                        <p>0 - 30 mins</p>
                    </li>
                    <li>
                        <input type="checkbox" onChange={() => handleCheck("31-60")}></input>
                        <p>31 - 60 mins</p>
                    </li>
                    <li>
                        <input type="checkbox"></input>
                        <p>60+ mins</p>
                    </li>
                </ul>
            </div>
        </>

    )
}

export default Filter