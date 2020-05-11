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
  const { id, name, cardsById, onAction } = props;
  const [cardState, setCardState] = useState(cardsById);

  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch(type) {
      case cardCreatorActions.ADD_CARD: {
        const id = uniqid();
        setCardState( prevCardState => ({...prevCardState,  [id]: { id,  content: payload.content }}));
        break;
      };
      case cardActions.ON_CHANGE_CARD: {
        const { id} = payload;
        setCardState(prevCardState => ({
          ...prevCardState,
          [id]: {
            ...prevCardState[id],
            ...payload,
          }
        }));
        break;
      }
      case cardActions.ON_DELETE_CARD: {
        const { id } = payload;
        setCardState(prevCards =>  {
          const { [id]: card, ...updatedCards } = prevCards;
          return updatedCards;
        });
      };
    };
  }, []);

  useEffect(() => {
    onAction({ type: streamActions.ON_STREAM_CHANGE, payload: { id, cardsById: cardState }});
  },[id, cardState, onAction])

  const cardsNode = Object.values(cardState).map((card, index) => <Card key={index} {...card} onAction={handleAction}/>);
  return (<div className="stream">
    <div className='streamHeader'>{name}</div>
    {cardsNode}
    <CardCreator onAction={handleAction}/>
  </div>);
}

Stream.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cardsById: PropTypes.object,
  onAction: PropTypes.func,
};

Stream.defaultProps = {
  cardsById: {},
};

export { streamActions };

export default Stream;