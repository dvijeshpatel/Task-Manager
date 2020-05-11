import React, { useCallback, useState } from 'react';
import uniqid from 'uniqid';

import _get from 'lodash/get';
import _map from 'lodash/map';
import _keyBy from 'lodash/keyBy';

import StreamCreator, { streamCreatorActions } from './components/streamCreator';
import Stream, { streamActions }   from './components/stream';

import './dashboard.css';

const DASHBOARD = {
  streamsById: {
    '1': { id: '1', name: 'To Do', cardIds: ['1', '2'] },
    '2': { id: '2', name: 'To', cardIds: ['1'] }
  },
  cardsById: {
    '1': { id: '1', content: 'You can also see board activity, change the background and more'},
    '2':  { id: '2', content: 'You can also see board activity, change the background and more'},
  },
  streamOrder: ['1','2'],
}

const Dashboard = props => {
  const [ state, setState ] = useState(DASHBOARD);
  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch (type) {
      case streamActions.ON_CARDS_CHANGE: {
        setState(preState => {
          const { streamId, cards } = payload;
          const cardsIds = _map(cards, 'id');
          const cardsById = _keyBy(cards, 'id');
          return {
            ...preState,
            streamsById: {
              ..._get(preState, 'streamsById'),
              [streamId]: {
                ..._get(preState, `streamsById.${streamId}`),
                cardsIds,
              }
            },
            cardsById: {
              ..._get(preState, 'cardsById'),
              ...cardsById,
            }
          }
        });
        break;
      }
      case streamCreatorActions.ADD_STREAM: {
        debugger;
        const { name } =payload;
        const id = uniqid();
        setState( prevState => ({
          ...prevState,
          streamsById: {
            ..._get(prevState, 'streamsById'),
            [id]: { id, name,  cardsById: {} },
          },
          streamOrder: [..._get(prevState, 'streamOrder',[]), id],
        }));
        break;
      }
    }
  }, []);
  const streams = _map(state.streamOrder,streamId => {
    const stream = _get(state, `streamsById.${streamId}`, {});
    const cards = _map(stream.cardIds, cardId => _get(state,`cardsById.${cardId}`));
    return  <Stream key={stream.id} stream={stream} cards={cards} onAction={handleAction}/>
  });
  return <div className="dashboard">
    {streams}
    <div className="streamCreatorContainer"><StreamCreator onAction={handleAction}/></div>
  </div>
};

export default Dashboard;