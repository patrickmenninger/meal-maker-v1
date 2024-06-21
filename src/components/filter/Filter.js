import CookTime from "./CookTime.js"
import Price from "./Price.js"

/*
Working on filtering but mainly working with changing the filters
based on which checkbox is clicked. I'm having problems with when you unclick a button
so just look at logic for backend and handeling those request and then you need to 
find a solution to fixing the request because rn eveytime you select a checkbox it gets added
on to the call to the api and this is just creating a long call request so you
gotta find a way to reset it
*/

const Filter = ( {updateParams, params} ) => {

    return (
        <>    
            <h3 className="text-grey">
                Filters
            </h3>
            <CookTime updateParams={updateParams} params={params}/>
            <Price updateParams params/>
        </>

    )
}

export default Filter