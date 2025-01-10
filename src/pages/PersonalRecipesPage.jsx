import React, { useState } from 'react'
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ListRecipes from '../components/ListRecipes';

const PersonalRecipesPage = () => {

    const pageSize = 2;

    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();

    const {data, error, isError, isPending, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ['recipes', 'users', id],
        queryFn: async (pageParam) => {

            const response = await axiosPrivate.get(`/users/${id}`);

            const start = pageParam.pageParam * pageSize;
            const end = start + pageSize;

            return {
                    content: response.data.recipes.slice(start, end), 
                    pageNumber: pageParam.pageParam,
                    totalRecipes: response.data.recipes.length
                    };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            let totalPages = Math.ceil(lastPage.totalRecipes / pageSize);
            return lastPage.pageNumber < totalPages ? lastPage.pageNumber + 1 : undefined;
        },
    });

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

  return (
    <>
    <ListRecipes recipePages={data.pages} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
    </>
  )
}

export default PersonalRecipesPage