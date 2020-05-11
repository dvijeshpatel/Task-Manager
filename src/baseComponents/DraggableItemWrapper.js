import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


const DraggableWrapper = props => {
  const { draggableId, index, className, children } = props;
  return (<Draggable draggableId={draggableId} index={index}>
    {provided => (
      <div className={className}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
        {children}
      </div>
    )}
  </Draggable>);
}

export default DraggableWrapper;