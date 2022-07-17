import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Category, EventType, getCategories, getAvailableEvents, getAvailableEventsByCate } from '../../api/queries';
import ErrorPage from '../Error/Error';
import Loading from '../Loading/Loading';

const Test = () => {
  const [value, setValue] = useState<Event[] | undefined>();
  const [categoryID, setCategoryID] = useState(2);
  // const { loading, error, data } = useQuery(getAvailableEvents, {
  //   onCompleted: (data) => {
  //     setValue(data.events);
  //   }
  // });
  const { loading, error, data } = useQuery(getAvailableEventsByCate, {
    variables: {
      id: categoryID,
    },
    skip: categoryID === null,
    onCompleted: (data) => {
      setValue(data.events);
    }
  });
  if (loading) return <Loading />;

  if (error) {
    console.log(error);
    //return <ErrorPage />
  }

  if (data) {
    console.log("data: ", data);
  }

  console.log(value)

  return (
    <div>Test</div>
  )
}

export default Test