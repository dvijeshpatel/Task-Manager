import React, { useState } from 'react';
import AddIcon from "@material-ui/icons/Add";

const StreamCreator = props => {
  const [isStreamCreatorDialogOpen, setIsStreamCreatorDialogOpen] = useState(false);
  return   <div className="streamAdder">
    <AddIcon fontSize="large"/>
    <div className="streamAdder__label">Add another List</div>
  </div>
}

export default StreamCreator;