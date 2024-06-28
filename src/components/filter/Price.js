import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const Price = ({updateParams, params}) => {

    const [show, setShow] = useState(false);

    const [price, setPrice] = useState(50);

    const toggleShow = () => {

        setShow(current => !current)

    }

    const handleSubmit = async (e) => {

        e.preventDefault();



    }

  return (
    <div className="border-b">
        <div className="text-lg filter-cats flex justify-between items-center text-grey p-2"  role="button" onClick={() => toggleShow()}>
            Price
            <FontAwesomeIcon icon={show ? faTimes: faPlus} className=""/>
        </div>
        <div className={show ? 'pl-5 flex items-center max-w-36' : 'hidden'}>
            <input 
                className="accent-grey mx-3" 
                type="range" 
                min="0" 
                max="50"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
            <input 
                className="bg-tan my-2 w-10 border-[1.5px] border-grey rounded-md" 
                type="number" 
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
            <button type="button" className="bg-tan border-[1.5px] border-grey rounded-md ml-2 px-1" onClick={handleSubmit}>Go</button>
        </div>
    </div>
  )
}

export default Price