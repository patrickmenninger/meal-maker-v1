import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const CookTime = ({updateParams, params}) => {

    const [show, setShow] = useState(false);

    const toggleShow = () => {

        setShow(current => !current);

    }

    const handleCheck = ( protein ) => {

        if (params.protein.indexOf(protein) !== -1) {

            let temp = params.protein;

            temp.splice(temp.indexOf(protein), 1);

            updateParams({
                ...params,
                protein: temp
            });

        } else {

            updateParams({

                ...params,
                protein: [...params.protein, protein]

            });

        }

    }

  return (
    <div className="border-b">
        <div className="text-lg filter-cats flex justify-between items-center p-2 text-grey"  role="button" onClick={() => toggleShow()}>
            Protein
            <FontAwesomeIcon icon={show ? faTimes: faPlus} className=""/>
        </div>
        <div className={show ? 'max-w-36' : 'hidden'}>
            <ul className="filter-list">
                <li className="filter-item">
                    <input type="checkbox" onChange={() => handleCheck("chicken")}></input>
                    <div>Chicken</div>
                </li>
                <li className="filter-item">
                    <input type="checkbox" onChange={() => handleCheck("beef")}></input>
                    <div>Beef</div>
                </li>
                <li className="filter-item">
                    <input type="checkbox" onChange={() => handleCheck("seafood")}></input>
                    <div>Seafood</div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default CookTime