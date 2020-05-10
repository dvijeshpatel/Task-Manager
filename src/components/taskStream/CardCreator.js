import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types';

import AddIcon from "@material-ui/icons/Add";

import CardCreatorDialog, { cardCreatorDialogActions } from './CardCreatorDialog';

const cardCreatorActions = {
  OPEN_CARD_CREATOR: 'OPEN_CARD_CREATOR',
  ADD_CARD: 'ADD_CARD',
}
const CardCreator = props => {
  const { onAction } = props;
  const [isCardCreatorDialogOpen, setIsCardCreatorDialogOpen] = useState(false);
  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch(type) {
      case cardCreatorDialogActions.CLOSE_CARD_CREATOR: {
        setIsCardCreatorDialogOpen(false);
        break;
      }
      case cardCreatorDialogActions.ADD_CARD: {
        onAction({ type: cardCreatorActions.ADD_CARD, payload: { content: payload.content }})
        break;
      }
      case cardCreatorActions.OPEN_CARD_CREATOR: {
        setIsCardCreatorDialogOpen(true);
        break;
      }
    }

  },[onAction]);

  const handleOpenCardCreator = useCallback(() => {
    handleAction({ type: cardCreatorActions.OPEN_CARD_CREATOR });
  },[])

  if(isCardCreatorDialogOpen) {
    return <CardCreatorDialog onAction={handleAction}/>;
  };


  return (<div className="taskStreamFooter" onClick={handleOpenCardCreator}>
    <AddIcon fontSize="large"/>
    <div className="taskStreamFooter__label">Add another card</div>
  </div>);
};

CardCreator.propTypes = {
  onAction: PropTypes.func,
  // className: PropTypes.string,
}

export { cardCreatorActions };

export default CardCreator;