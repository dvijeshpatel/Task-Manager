import React, { useCallback, useState } from 'react';
import uniqid from 'uniqid';

import './dashboard.css';

import StreamCreator, { streamCreatorActions } from './components/streamCreator';
import Stream, { streamActions }   from './components/stream';

const CARDS = [
  { id: '1', content: 'You can also see board activity, change the background and more'},
  { id: '2', content: 'You can also see board activity, change the background and more'},

]
const DASHBOARD = {
  streams: [{ id: '1', name: 'To Do', cards: CARDS  }]
}

const Dashboard = props => {
  const [ streams, setStream ] = useState(DASHBOARD.streams);
  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch (type) {
      case streamActions.ON_STREAM_CHANGE: {
        setStream(prevStreams => {
          const { id } = payload;
          const streamIndex = prevStreams.findIndex(stream => stream.id === id);
          if (streamIndex !== -1) {
            return [...prevStreams.slice(0, streamIndex), { ...prevStreams[streamIndex], ...payload }, ...prevStreams.slice(streamIndex + 1)];
          }
          return prevStreams;
        });
        break;
      }
      case streamCreatorActions.ADD_STREAM: {
        const { name } =payload;
        setStream( prevStreams => [...prevStreams, { id: uniqid(), name, cards: []}]);
      }
    }
  }, []);
  return <div className="dashboard">
    {streams.map(stream => <Stream key={stream.id} {...stream} onAction={handleAction}/>)}
    <div className="streamCreatorContainer"><StreamCreator onAction={handleAction}/></div>
  </div>
};

export default Dashboard;