import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import _slice from 'lodash/slice';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _reduce from 'lodash/reduce';

import Card, { cardActions }  from './components/card';
import CardCreator, { cardCreatorActions } from './components/cardCreator';

import  './stream.css';

const streamActions = {
  ON_CARDS_CHANGE: 'ON_CARDS_CHANGE',
}

const Stream = props => {
  const { stream, cards, onAction } = props;
  const { id, name  } = stream;
  const [_cards,  _setCards ] = useState(cards);
  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch(type) {
      case cardCreatorActions.ADD_CARD: {
        const id = uniqid();
        _setCards( prevCards => [...prevCards,  { id,  content: payload.content }]);
        break;
      };
      case cardActions.ON_CHANGE_CARD: {
        const { id } = payload;
        _setCards( prevCards => _reduce(prevCards, (accum, card) => {
          if(card.id ===id) {
            accum.push(payload);
            return accum;
          }
          accum.push(card);
          return accum;
        },[]));
        break;
      }
      case cardActions.ON_DELETE_CARD: {
        const { id } = payload;
        _setCards( prevCards => _filter(prevCards, card => card.id!== id));
      };
    };
  }, []);

  useEffect(() => {
    onAction({ type: streamActions.ON_CARDS_CHANGE, payload: { streamId: id, cards: _cards }});
  },[id, _cards, onAction]);

  const cardsNode = _map(_cards, (card, index) => <Card key={index} {...card} onAction={handleAction}/>);

  return (<div className="stream">
    <div className='streamHeader'>{name}</div>
    {cardsNode}
    <CardCreator onAction={handleAction}/>
  </div>);
}

Stream.propTypes = {
  id: PropTypes.string,
  stream: PropTypes.object,
  cards: PropTypes.array,
  onAction: PropTypes.func,
};

Stream.defaultProps = {
  stream: {},
  cards: [],
};

export { streamActions };

export default Stream;