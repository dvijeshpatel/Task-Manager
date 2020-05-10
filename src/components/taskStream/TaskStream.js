import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import  './taskStream.css';

import Header from './Header';
import Card  from './components/card';
import CardCreator, { cardCreatorActions } from './CardCreator';

//
// const CARDS = [
//   { content: 'You can also see board activity, change the background and more'},
//   { content: 'You can also see board activity, change the background and more'},
//   { content: 'You can also see board activity, change the background and more'},
//   { content: 'You can also see board activity, change the background and more'},
// ]

const taskStreamActions = {
  ON_TASK_STREAM_CHANGE: 'ON_TASK_STREAM_CHANGE',
}

const TaskStream = props => {
  const { id, name, cards, onAction } = props;
  const [taskStreamCards, setTaskStreamCards] = useState(cards);

  const handleAction = useCallback(action => {
    const { type, payload } = action;
    if(type === cardCreatorActions.ADD_CARD) {
      setTaskStreamCards( prevCards => [...prevCards, { content: payload.content }]);
    }
  }, []);

  useEffect(() => {
    onAction({ type: taskStreamActions.ON_TASK_STREAM_CHANGE, payload: { id, cards: taskStreamCards }});
  },[id, taskStreamCards, onAction])

  const cardsNode = taskStreamCards.map((card, index) => <Card key={index} {...card}/>);
  return (<div className="taskStream">
    <Header name={name}/>
    {cardsNode}
    <CardCreator onAction={handleAction}/>
  </div>);
}

TaskStream.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cards: PropTypes.array,
  onAction: PropTypes.func,
};

TaskStream.defaultProps = {
  cards: [],
};

export { taskStreamActions };

export default TaskStream;