import categories from "./categories"
import { Category } from './categories';

import IMG_EVENT from '../assets/images/event-bg-1.png'
import IMG_EVENT2 from '../assets/images/event-2-img.jpg'
import IMG_EVENT3 from '../assets/images/event-3-img.jpg'
import IMG_EVENT4 from '../assets/images/event-4-img.jpg'
import IMG_EVENT5 from '../assets/images/event-5-img.webp'
import IMG_EVENT6 from '../assets/images/event-6-img.jpg'
import IMG_EVENT7 from '../assets/images/event-7-img.jpg'
import IMG_EVENT8 from '../assets/images/event-8-img.jpg'
import IMG_EVENT9 from '../assets/images/event-9-img.jpg'
import IMG_EVENT10 from '../assets/images/event-10-img.webp'
import IMG_EVENT11 from '../assets/images/event-11-img.jpg'

const getCategory = (id: number): Category => {
  const targetCategory = categories.find(category => category.id === id);
  if (targetCategory) return targetCategory;
  return {id: 0, name: ''};
}

export interface Event {
  id: number,
  name: string,
  image: string,
  location: string,
  start_date: Date,
  end_date: Date,
  category: Category[],
}

const events: Event[] = [
  {
    id: 1,
    name: "BTS Concert",
    image: IMG_EVENT,
    location: "Trung Luc, Dang Lam, Hai An, Hai Phong",
    start_date: new Date('2022-05-06 08:00:00'),
    end_date:  new Date('2022-06-09 16:00:00'),
    category: [1, 2].map(id => getCategory(id)),
  },
  {
    id: 2,
    name: "Temen-ni-gru Visit Tour",
    image: IMG_EVENT2,
    location: "Santa Fields, Port Adonis, State	Colorado",
    start_date: new Date('2022-12-21 08:00:00'),
    end_date:  new Date('2022-12-31 16:00:00'),
    category: [3, 4].map(id => getCategory(id)),
  },
  {
    id: 3,
    name: "Persona Paradox Concert",
    image: IMG_EVENT3,
    location: "Sister Hollow, New Bridgette, Connecticut",
    start_date: new Date('2022-02-11 08:00:00'),
    end_date:  new Date('2022-02-14 16:00:00'),
    category: [1].map(id => getCategory(id)),
  },
  {
    id: 4,
    name: "UniVerse Exhibition",
    image: IMG_EVENT4,
    location: "Wilderman Skyway, Port Ophelia, Oregon",
    start_date: new Date('2022-03-30 06:00:00'),
    end_date:  new Date('2022-04-28 14:00:00'),
    category: [3].map(id => getCategory(id)),
  },
  {
    id: 5,
    name: "Oranje Festival",
    image: IMG_EVENT5,
    location: "Jeremie Park, West Stella, Tennessee",
    start_date: new Date('2022-07-01 06:00:00'),
    end_date:  new Date('2022-08-10 13:00:00'),
    category: [2].map(id => getCategory(id)),
  },
  {
    id: 6,
    name: "Navy Museum Visit Tour",
    image: IMG_EVENT6,
    location: "Mathew Point, South Bellaton, Indiana",
    start_date: new Date('2022-01-02 06:00:00'),
    end_date:  new Date('2022-01-03 13:00:00'),
    category: [4].map(id => getCategory(id)),
  },
  {
    id: 7,
    name: "Devil May Cry Liveshow",
    image: IMG_EVENT7,
    location: "Fairhaven Ave, Santa Ana, California",
    start_date: new Date('2022-01-02 13:00:00'),
    end_date:  new Date('2022-01-03 17:00:00'),
    category: [1, 3].map(id => getCategory(id)),
  },
  {
    id: 8,
    name: "Frozen Resolution",
    image: IMG_EVENT8,
    location: "Mcvey Rd, New Tazewell, Tennessee",
    start_date: new Date('2022-01-02 13:00:00'),
    end_date:  new Date('2022-01-03 17:00:00'),
    category: [1, 2].map(id => getCategory(id)),
  },
  {
    id: 9,
    name: "Pokemon Special Festival",
    image: IMG_EVENT9,
    location: "Arrow Wood Dr, Waleska, Georgia",
    start_date: new Date('2022-11-02 13:00:00'),
    end_date:  new Date('2023-01-03 17:00:00'),
    category: [2, 3].map(id => getCategory(id)),
  },
  {
    id: 10,
    name: "Starset Concert",
    image: IMG_EVENT10,
    location: "Ocean Trace Rd, Saint Augustine, Florida",
    start_date: new Date('2022-04-02 13:00:00'),
    end_date:  new Date('2022-04-03 17:00:00'),
    category: [1].map(id => getCategory(id)),
  },
  {
    id: 11,
    name: "Yanni Concert",
    image: IMG_EVENT11,
    location: "Girl Scout Rd, Drummonds, Tennessee",
    start_date: new Date('2022-12-30 13:00:00'),
    end_date:  new Date('2022-12-31 17:00:00'),
    category: [1].map(id => getCategory(id)),
  },
]

export default events;