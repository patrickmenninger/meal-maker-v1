import './home-image.jpg';
import '../../index.css';

const Home = () => {
    return (
        <>  
            {/* The home image */}
            <img src={require('./home-image.jpg')} alt='not working' className='home-image'/>
            <div className='home-text'>
                Save time with hassle free meal prepping.
            </div>
        </>
    )
}

export default Home