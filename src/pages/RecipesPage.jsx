import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useAuth } from '../context/AuthProvider';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const RecipePage = () => {

    const axiosPrivate = useAxiosPrivate();

    const page = 0;

    const {data, isPending, isError, error} = useQuery({
        queryKey: ['recipes', page],
        queryFn: async () => {
            const response = await axiosPrivate.get("/recipes", {
                params: {
                    page: page,
                }
            });

            return response.data;
        }
    });

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }


  return (
    <div>{data.map((recipe, i) => <div key={i}>{recipe.title}</div>)}</div>
  )
}

export default RecipePage