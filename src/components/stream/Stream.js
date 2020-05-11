import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import Card, { cardActions }  from './components/card';
import CardCreator, { cardCreatorActions } from './components/cardCreator';

import  './stream.css';

const streamActions = {
  ON_STREAM_CHANGE: 'ON_STREAM_CHANGE',
}

const Stream = props => {
  const { id, name, cards, onAction } = props;
  const [streamCards, setStreamCards] = useState(cards);

  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch(type) {
      case cardCreatorActions.ADD_CARD: {
        setStreamCards( prevCards => [...prevCards, { id: uniqid(), content: payload.content }]);
        break;
      };
      case cardActions.ON_CHANGE_CARD: {
        const { id} = payload;
        setStreamCards( prevCards => {
          const cardIndex = prevCards.findIndex(card => card.id === id);
          if(cardIndex!==-1) {
            return [...prevCards.slice(0, cardIndex), { ...prevCards[cardIndex], ...payload }, ...prevCards.slice(cardIndex + 1)];
          }
          return prevCards;
        });
        break;
      }
      case cardActions.ON_DELETE_CARD: {
        setStreamCards(prevCards => prevCards.filter(card => card.id !== payload.id));
      }
    };
  }, []);

  useEffect(() => {
    onAction({ type: streamActions.ON_STREAM_CHANGE, payload: { id, cards: streamCards }});
  },[id, streamCards, onAction])

  const cardsNode = streamCards.map((card, index) => <Card key={index} {...card} onAction={handleAction}/>);
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