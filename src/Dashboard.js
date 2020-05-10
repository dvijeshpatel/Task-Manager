import React, { useState } from 'react';
import './dashboard.css';

import TaskStream  from './components/taskStream';

const TASK_STREAMS = [1,2,3];

const Dashboard = props => {
  const [ taskStreams, setTaskStream ] = useState(TASK_STREAMS);
  return <div className="dashboard">{taskStreams.map((taskStream, index) => <TaskStream key={index}/>)}</div>
};

export default Dashboard;