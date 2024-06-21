import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const Price = () => {

    const [show, setShow] = useState(false);

    const toggleShow = () => {

        setShow(current => !current)

    }

  return (
    <div className="border-b">
        <div className="text-lg filter-cats flex justify-between items-center text-grey p-2"  role="button" onClick={() => toggleShow()}>
            Price
            <FontAwesomeIcon icon={show ? faTimes: faPlus} className=""/>
        </div>
        <div className={show ? 'pl-8' : 'hidden'}>
            <input className="accent-grey" type="range" min="0" max="50"/>
        </div>
    </div>
  )
}

export default Price