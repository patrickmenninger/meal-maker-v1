import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Card from '../components/Card';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const RecipePage = () => {

    const axiosPrivate = useAxiosPrivate();

    const {data, error, isError, isPending, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ['recipes'],
        queryFn: async (pageParam) => {
            const response = await axiosPrivate.get("/recipes", {
                params: {
                    page: pageParam.pageParam,
                }
            });

            return {
                    content: response.data.content, 
                    pageNumber: response.data.pageable.pageNumber,
                    totalPages: response.data.totalPages,
                    };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.pageNumber < lastPage.totalPages ? lastPage.pageNumber + 1 : undefined;
        },
    });

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }


  return (
    <div className="flex flex-wrap">
        {/* <div className="flex justify-evenly w-full">
            <Button>Filter</Button>
            <Button>Sort</Button>
        </div> */}
        {data.pages.map((group) => 
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

export default RecipePage