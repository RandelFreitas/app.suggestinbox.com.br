import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { showMessage, hideMessage } from '../../store/sharedStores/messageReducer';

const MessageDialog = (props) => {
  return(
    <div>
      <Dialog open={props.openDialog} onClick={()=> props.hideMessage} onClose={props.hideMessage}>
        <DialogTitle>
          Atenção
        </DialogTitle>
        <DialogContent>
          {props.message}
        </DialogContent>
        <DialogActions onClick={()=> props.hideMessage}>
          <Button onClick={props.hideMessage}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


const mapStateToProps = state => ({
  openDialog: state.message.showMessage,
  message: state.message.message
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({showMessage, hideMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageDialog);