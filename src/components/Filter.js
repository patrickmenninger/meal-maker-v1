
/*
Working on filtering but mainly working with changing the filters
based on which checkbox is clicked. I'm having problems with when you unclick a button
so just look at logic for backend and handeling those request and then you need to 
find a solution to fixing the request because rn eveytime you select a checkbox it gets added
on to the call to the api and this is just creating a long call request so you
gotta find a way to reset it
*/

const Filter = ( {updateParams, params} ) => {

    const handleCheck = ( cookTime ) => {

        if (params.cookTime.indexOf(cookTime) !== -1) {

            //Sets the temp array
            let temp = params.cookTime

            //Gets rid of the cookTime if it was already in the array
            temp.splice(temp.indexOf(cookTime), 1);

            //Updates the cookTimes without the unselected time
            updateParams({
                ...params,
                cookTime: temp
            });

        } else {

            //Updates the cookTimes by adding in the new cookTime
            updateParams({
                ...params,
                cookTime: [...params.cookTime, cookTime]
            });
            
        }

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
                        <input type="checkbox" onClick={() => handleCheck("0-30")}></input>
                        <p>0 - 30 mins</p>
                    </li>
                    <li>
                        <input type="checkbox" onChange={() => handleCheck("31-60")}></input>
                        <p>31 - 60 mins</p>
                    </li>
                    <li>
                        <input type="checkbox" onChange={() => handleCheck("60-2880")}></input>
                        <p>60+ mins</p>
                    </li>
                </ul>
            </div>
        </>

    )
}

export default Filter