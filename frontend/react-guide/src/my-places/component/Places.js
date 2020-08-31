import React, { useEffect, useState } from 'react';

import './Places.css';

import PlaceList from '../presentational/PlaceList';

import { useHttp } from '../../shared/hooks/http-hooks';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u2'
  }
];


const Places = Props => {

  const [item,setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const sendRequest = useHttp();


    useEffect( async () => {
      const response = await fetch('http://localhost:4000/api/place/p1');
      const data = await response.json();
      const tempData = data.places;
      console.log("TempData here",tempData);
      setItem(tempData);
      setLoading(false);
    }, []);


  return (
    <div className='places'>
      {/* <PlaceList item = {item} /> */}
    {loading? <p style = {{color:"white"}}>Loading ...</p> :<PlaceList item = {item} /> }
    </div>
  )

}

export default Places;