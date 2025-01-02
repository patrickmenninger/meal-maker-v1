import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { axiosPrivate } from '../api/axios';
import Button from '../components/Button';

const RecipePage = () => {

    const { id } = useParams();

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['recipes', id],
        queryFn: async () => {
            const response = await axiosPrivate.get(`/recipes/${id}`);
            return response.data;
        },
    });

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

  return (
    <div>
        <div>{data.title}</div>
        <Button type="button"><Link to={`/users/${data.user.id}`}>User</Link></Button>
    </div>
  )
}

export default RecipePage