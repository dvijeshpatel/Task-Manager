import React, { useCallback, useState } from 'react';
import './dashboard.css';

import AddIcon from "@material-ui/icons/Add";

import StreamCreator from './StreamCreator';
import TaskStream, { taskStreamActions }   from './components/taskStream';

const TASK_STREAMS = [{ name: 'To Do'}];

const CARDS = [
  { content: 'You can also see board activity, change the background and more'},
  { content: 'You can also see board activity, change the background and more'},
  { content: 'You can also see board activity, change the background and more'},
  { content: 'You can also see board activity, change the background and more'},
]
const DASHBOARD = {
  taskStreams: [{ id: '1', name: 'To Do', cards: CARDS  }]
}

const dashboardActions = {
  ADD_TASK_STREAM: 'ADD_TASK_STREAM',
}
const Dashboard = props => {
  const [ taskStreams, setTaskStream ] = useState(DASHBOARD.taskStreams);
  const handleAction = useCallback(action => {
    const { type, payload } = action;
    if(type === taskStreamActions.ON_TASK_STREAM_CHANGE) {
        setTaskStream( prevTaskStreams => {
          const { id } = payload;
          const streamIndex = taskStreams.findIndex(taskStream => taskStream.id === id);
          if(streamIndex !== -1) {
            return [...prevTaskStreams.slice(0, streamIndex), { ...prevTaskStreams[streamIndex], ...payload }, ...prevTaskStreams.slice(streamIndex + 1)];
          }
          return prevTaskStreams;
        });
      }
    }, []);
  return <div className="dashboard">
    {taskStreams.map(taskStream => <TaskStream key={taskStream.id} {...taskStream} onAction={handleAction}/>)}
    <StreamCreator/>
  </div>
};

export default Dashboard;