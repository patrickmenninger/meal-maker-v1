import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import { axiosPrivate } from '../api/axios';

const RecipePage = () => {

    const { id } = useParams();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['recipes', id],
        queryFn: async () => {
            const response = await axiosPrivate.get(`/recipes/${id}`);
            return response.data;
        },
        staleTime: 0,
    });

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

  return (
    <div>{data.title}</div>
  )
}

export default RecipePage