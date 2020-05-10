import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import  './stream.css';

import Card  from './components/card';
import CardCreator, { cardCreatorActions } from './components/cardCreator';

const streamActions = {
  ON_STREAM_CHANGE: 'ON_STREAM_CHANGE',
}

const Stream = props => {
  const { id, name, cards, onAction } = props;
  const [streamCards, setStreamCards] = useState(cards);

  const handleAction = useCallback(action => {
    const { type, payload } = action;
    if(type === cardCreatorActions.ADD_CARD) {
      setStreamCards( prevCards => [...prevCards, { content: payload.content }]);
    }
  }, []);

  useEffect(() => {
    onAction({ type: streamActions.ON_STREAM_CHANGE, payload: { id, cards: streamCards }});
  },[id, streamCards, onAction])

  const cardsNode = streamCards.map((card, index) => <Card key={index} {...card}/>);
  return (<div className="stream">
    <div className='streamHeader'>{name}</div>
    {cardsNode}
    <CardCreator onAction={handleAction}/>
  </div>);
}

Stream.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cards: PropTypes.array,
  onAction: PropTypes.func,
};

Stream.defaultProps = {
  cards: [],
};

export { streamActions };

export default Stream;