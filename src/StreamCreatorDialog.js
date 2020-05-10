import React, { useCallback, useState } from 'react';
import CloseIcon from "@material-ui/icons/Close";

const StreamCreatorDialog = props => {
  const {  onAction } = props;
  const [content, setContent] = useState('');
  // const handleCloseCardCreator = useCallback(() => {
  //   onAction({ type: cardCreatorDialogActions.CLOSE_CARD_CREATOR});
  // },[onAction]);
  // const handleAddCard = useCallback(() => {
  //   onAction({ type: cardCreatorDialogActions.CLOSE_CARD_CREATOR});
  //   onAction({ type: cardCreatorDialogActions.ADD_CARD, payload: { content }});
  // }, [content, onAction]);
  //
  // const handleChange = useCallback(event => {
  //   setContent(event.currentTarget.value);
  // },[]);

  return <div className="cardCreator">
    <textarea className="cardCreator__content" placeholder="Please Enter Description.." value={content}/>
    <div className="cardCreator__footer">
      <button className="cardCreator__submit"> Add Card</button>
      <CloseIcon className="cardCreator__close" fontSize="large" />
    </div>
  </div>;
}

export default StreamCreatorDialog;