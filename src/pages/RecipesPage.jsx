import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import ListRecipes from '../components/ListRecipes';

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
    <ListRecipes recipePages={data.pages} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
  )
}

export default RecipePage