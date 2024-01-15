import { createSearchParams, useLocation, useNavigate } from "react-router-dom"

/*
Working on filtering but mainly working with changing the filters
based on which checkbox is clicked. I'm having problems with when you unclick a button
so just look at logic for backend and handeling those request and then you need to 
find a solution to fixing the request because rn eveytime you select a checkbox it gets added
on to the call to the api and this is just creating a long call request so you
gotta find a way to reset it
*/

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