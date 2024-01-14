

const Filter = () => {

    return (
        <>    <h3>
            Filter
        </h3>
            <div className="filter-cats">
                Cook time
            </div>
            <div>
                <ul className="filter-list">
                    <li>
                        <input type="checkbox"></input>
                        <p>0 - 15 mins</p>
                    </li>
                    <li>
                        <input type="checkbox"></input>
                        <p>16 - 30 mins</p>
                    </li>
                    <li>
                        <input type="checkbox"></input>
                        <p>31 - 45 mins</p>
                    </li>
                    <li>
                        <input type="checkbox"></input>
                        <p>46 - 60 mins</p>
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