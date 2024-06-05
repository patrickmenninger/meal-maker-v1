'../img/home-image.jpg';
import '../index.css';

const Home = () => {
    return (
        <div className="px-20 pt-1 bg-off-white">
            <img src={require('../img/home-image.jpg')} alt='not working' className='home-image'/>
        </div>
    )
}

export default Home 