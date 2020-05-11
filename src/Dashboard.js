import React, { useCallback, useState } from 'react';
import uniqid from 'uniqid';
import { DragDropContext } from 'react-beautiful-dnd';

import _get from 'lodash/get';
import _map from 'lodash/map';
import _keyBy from 'lodash/keyBy';

import StreamCreator, { streamCreatorActions } from './components/streamCreator';
import Stream, { streamActions }   from './components/stream';

import './dashboard.css';

const DASHBOARD = {
  streamsById: {
  },
  cardsById: {
  },
  streamOrder: [],
}

const Dashboard = props => {
  const [ state, setState ] = useState(DASHBOARD);
  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch (type) {
      case streamActions.ON_CARDS_CHANGE: {
        setState(prevState => {
          const { streamId, cards } = payload;
          const cardIds = _map(cards, 'id');
          const cardsById = _keyBy(cards, 'id');
          return {
            ...prevState,
            streamsById: {
              ..._get(prevState, 'streamsById'),
              [streamId]: {
                ..._get(prevState, `streamsById.${streamId}`),
                cardIds,
              }
            },
            cardsById: {
              ..._get(prevState, 'cardsById'),
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

  const handleDragEnd = useCallback(result => {
    debugger;
    const { destination, source, draggableId} = result;
    if(!destination) {
      return;
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    setState(prevState => {
      debugger;
      const stream = _get(prevState, `streamsById.${source.droppableId}`);
      const newCardIds = [..._get(stream, 'cardIds',[])];
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      const newStream = {
        ...stream,
        cardIds: newCardIds,
      }
      const newState = {
        ...prevState,
        streamsById: {
          ...state.streamsById,
          [newStream.id]: newStream,
        }
      };
      return newState;
    });
  },[])
  const streams = _map(state.streamOrder,streamId => {
    const stream = _get(state, `streamsById.${streamId}`, {});
    const cards = _map(stream.cardIds, cardId => _get(state,`cardsById.${cardId}`));
    return  <Stream key={stream.id} stream={stream} cards={cards} onAction={handleAction}/>
  });
  return <div className="dashboard">
    <DragDropContext onDragEnd={handleDragEnd}>{streams}</DragDropContext>
    <div className="streamCreatorContainer"><StreamCreator onAction={handleAction}/></div>
  </div>
};

export default Dashboard;