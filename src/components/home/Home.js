import './home-image.jpg';
import './Home.css'

const Home = () => {
    return (
        <>  
            <img src={require('./home-image.jpg')} alt='not working' className='home-image'/>
            <div className='home-text'>
                Save time with hassle free meal prepping.
            </div>
        </>
    )
}

export default Home