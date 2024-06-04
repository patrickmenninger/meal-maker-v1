import { Col, Row, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Filter from './Filter';
import '../index.css';

const Recipes = () => {

    const [recipes, setRecipes] = useState();
    const [params, setParams] = useState({
        title: "",
        cookTime: "",
        totalCost: ""
    });
    const axiosPrivate = useAxiosPrivate();

    const addFilters = ( paramaters ) => {
        setParams(paramaters);
    }

    //Called everytime the params change
    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        //Gets the list of recipes from the Java Application
        const getRecipesFilter = async () => {
    
            try {

                //Converts the array into a string split up by '%' signs to pass to the query
                let cookTime = params?.cookTime?.toString().replaceAll(',', '%2C')

                //Makes the request using the params in the URL
                const response = await axiosPrivate.get(`/api/v1/recipes?title=${params.title}&cookTime=${cookTime}&totalCost=${params.totalCost}`, {
                    signal: controller.signal
                });
                isMounted && setRecipes(response.data);
    
    
            } catch (err) {
                console.error(err);
            }
    
        }

        getRecipesFilter();

        //Cleanup function
        return () => {
            isMounted = false;
            controller.abort();
        }

    },[params, axiosPrivate])

    //Gets all the recipes
    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const getRecipes = async () => {
            
            try {
    
                const response = await axiosPrivate.get(`/api/v1/recipes`, {
                    signal: controller.signal
                });
                isMounted && setRecipes(response.data);
    
    
            } catch (err) {
                console.error(err);
            }
    
        }

        getRecipes();
        

        return () => {
            isMounted = false;
            controller.abort();
        }

    },[axiosPrivate])

  return (
    <div className='content'>
        <Container>
            <Row>
                <Col className='br filter' xs={2}>
                    {/* Passes in the setParams function */}
                    <Filter updateParams={addFilters} params={params}/>
                </Col>
                <Col>
                    Recipes
                    <div>
                        <hr/>
                        Image, title, stars
                        <br/>
                        author, cooking time
                        <hr/>
                    </div>
                    <div>
                        {
                            recipes?.length
                                ? (
                                    <ul className='recipe-list'>
                                        {
                                            recipes.map((recipe, i) => <li key={i}>
                                                    <img className='recipe-image' src={recipe.image} alt="" style={{float: "left"}}/>
                                                    <p className='recipe-title'>{recipe.title}</p>
                                                    <p className='recipe-time'>Total time: {recipe.cookTime}min</p>
                                            </li>)
                                        }
                                    </ul>
                                ) : <h1>no recipes </h1>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
        <div className='pages'>
            Page 
        </div>
    </div>
  )
}

export default Recipes