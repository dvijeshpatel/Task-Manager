import React from 'react';
import  './taskStream.css';
import Card from './components/card';

const cards = [
  { content: 'You can also see board activity, change the background and more'},
  { content: 'You can also see board activity, change the background and more'},
  { content: 'You can also see board activity, change the background and more'},
  { content: 'You can also see board activity, change the background and more'},
]
const TaskStream = props => {
  const cardsNode = cards.map((card, index) => <Card key={index} {...card}/>);
  return <div className="taskStream">{cardsNode}</div>;
}

export default TaskStream;