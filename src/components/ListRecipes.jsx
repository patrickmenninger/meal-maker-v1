import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const ListRecipes = ({recipePages, hasNextPage, fetchNextPage, isFetchingNextPage}) => {

  return (
    <div className="flex flex-wrap">
        {/* <div className="flex justify-evenly w-full">
            <Button>Filter</Button>
            <Button>Sort</Button>
        </div> */}
        {recipePages.map((group) => 
            group.content.map((recipe) => 
                <div key={recipe.id} className="w-full mx-8 my-2">
                    <Link to={`/recipes/${recipe.id}`}>
                        <Card className="flex flex-col justify-center items-center">
                            <img src="/no-image.png" className="w-1/2 h-96"/>
                            <div>{recipe.title}</div>
                            <div className="w-full flex justify-between">
                                <span>{recipe.cookTime}</span>
                                <span>{recipe.totalCost}</span>
                            </div>
                        </Card>
                    </Link>
                </div>
            )
        )}
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
    </div>
  )
}

export default ListRecipes