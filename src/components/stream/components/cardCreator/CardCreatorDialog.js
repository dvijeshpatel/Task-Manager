import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

const cardCreatorDialogActions = {
  CLOSE_CARD_CREATOR: 'CLOSE_CARD_CREATOR',
  ADD_CARD: 'ADD_CARD',
};

const CardCreatorDialog = props => {
  const {  onAction } = props;
  const [content, setContent] = useState('');
  const handleCloseCardCreator = useCallback(() => {
    onAction({ type: cardCreatorDialogActions.CLOSE_CARD_CREATOR});
  },[onAction]);
  const handleAddCard = useCallback(() => {
    onAction({ type: cardCreatorDialogActions.CLOSE_CARD_CREATOR});
    onAction({ type: cardCreatorDialogActions.ADD_CARD, payload: { content }});
  }, [content, onAction]);

  const handleChange = useCallback(event => {
    setContent(event.currentTarget.value);
  },[]);

  return <div className="cardCreatorDialog">
    <textarea className="cardCreatorDialog__content" placeholder="Please Enter Description.." value={content} onChange={handleChange}/>
    <div className="cardCreatorDialog__footer">
      <button className="cardCreatorDialog__submit" onClick={handleAddCard}> Add Card</button>
      <CloseIcon className="cardCreatorDialog__close" fontSize="large" onClick={handleCloseCardCreator}/>
     </div>
    </div>;
};

CardCreatorDialog.propType = {
  onAction: PropTypes.func,
}

export { cardCreatorDialogActions };

export default CardCreatorDialog;