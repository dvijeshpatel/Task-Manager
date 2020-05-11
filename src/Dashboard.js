import React, { useCallback, useState } from 'react';
import uniqid from 'uniqid';

import './dashboard.css';

import StreamCreator, { streamCreatorActions } from './components/streamCreator';
import Stream, { streamActions }   from './components/stream';

const DASHBOARD = {
  streamsById: {
    '1': { id: '1', name: 'To Do', cardsById: {
        '1': { id: '1', content: 'You can also see board activity, change the background and more'},
        '2':  { id: '2', content: 'You can also see board activity, change the background and more'},
      }
    }
  }
}

const Dashboard = props => {
  const [ streamState, setStreamState ] = useState(DASHBOARD.streamsById);
  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch (type) {
      case streamActions.ON_STREAM_CHANGE: {
        setStreamState(prevStreamState => {
          const { id } = payload;
          return {
            ...prevStreamState,
            [id]: {
              ...prevStreamState[id],
              ...payload,
            }
          }
        });
        break;
      }
      case streamCreatorActions.ADD_STREAM: {
        const { name } =payload;
        const id = uniqid();
        setStreamState( prevStreamState => ({...prevStreamState, [id]: { id, name, cardsById: {} }}));
      }
    }
  }, []);
  return <div className="dashboard">
    {Object.values(streamState).map(stream => <Stream key={stream.id} {...stream} onAction={handleAction}/>)}
    <div className="streamCreatorContainer"><StreamCreator onAction={handleAction}/></div>
  </div>
};

export default Dashboard;