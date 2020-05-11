import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const DroppableWrapper = props  => {
  const { droppableId, className,  children } = props;
  return <Droppable droppableId={droppableId}>
    {provided => (
      <div className={className}
        ref={provided.innerRef}
        {...provided.droppableProps}>
        {children}
      </div>
    )}
  </Droppable>
}

export default DroppableWrapper