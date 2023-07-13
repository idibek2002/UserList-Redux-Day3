import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { handleChangeModal, oNCancel } from '../../reducers/todos';
const Modal = (props) => {
    const {modalTitle,open,nameModal}= props
    const dispatch= useDispatch()
  return (
    <Dialog
        open={open}
        onClose={()=>{dispatch(handleChangeModal({name:nameModal, value: false}))
      dispatch(oNCancel())}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {modalTitle}
        </DialogTitle>
        <DialogContent className='w-[400px]'>
          <DialogContentText id="alert-dialog-description">
            {props.children}
          </DialogContentText>
        </DialogContent>
      </Dialog>
  )
}

export default Modal