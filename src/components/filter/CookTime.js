import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const CookTime = ({updateParams, params}) => {

    const [show, setShow] = useState(false);

    const toggleShow = () => {

        setShow(current => !current)

    }

    const handleCheck = ( cookTime ) => {

        //If the cookTime is in the list of cook times
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
    <div className="border-b border-t">
        <div className="text-lg filter-cats flex justify-between items-center p-2 text-grey"  role="button" onClick={() => toggleShow()}>
            Cook Time
            <FontAwesomeIcon icon={show ? faTimes: faPlus} className=""/>
        </div>
        <div className={show ? 'max-w-36' : 'hidden'}>
            <ul className="filter-list">
                <li className="filter-item">
                    <input type="checkbox" onChange={() => handleCheck("0-30")}></input>
                    <div>0 - 30 mins</div>
                </li>
                <li className="filter-item">
                    <input type="checkbox" onChange={() => handleCheck("31-60")}></input>
                    <div>31 - 60 mins</div>
                </li>
                <li className="filter-item">
                    <input type="checkbox" onChange={() => handleCheck("60-2880")}></input>
                    <div>60+ mins</div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default CookTime