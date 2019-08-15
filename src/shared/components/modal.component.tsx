import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { CustomButton, CustomButtonProps } from "./button.component";

/** Custom props for modal dialog */
export interface ICustomModalDialogProps {
  /** open modal? */
  isOpenModal: boolean;
  /** on close modal handler */
  onCloseModal: any;
  /** modal id */
  modalId: string;
  /** modal title */
  modalTitle?: string;
  /** open button for the modal */
  openModalButton: CustomButtonProps & {
    /** open button title */
    title: string;
  };
  /** cancel button */
  canCancel: boolean;
  /** cancel button props */
  cancelModalButton?: CustomButtonProps & {
    /** cancel button title */
    title?: string;
  };
  /** confirm button */
  canConfirm: boolean;
  /** confirm button props*/
  confirmModalButton?: CustomButtonProps & {
    /** confirm button title */
    title?: string;
  };
  /** content of the modal */
  children: any;
}

/** Custom modal dialog opened by a custom button */
export function CustomModalDialog(props: ICustomModalDialogProps) {
  const isOpenModal: boolean = props.isOpenModal;

  return (
    <div>
      <CustomButton
        {...props.openModalButton}
        onClick={props.openModalButton.onClick}
        disabled={isOpenModal}
      >
        {props.openModalButton.title}
      </CustomButton>
      <Dialog
        id={props.modalId}
        open={isOpenModal}
        onClose={props.onCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography align="left" variant="inherit">
            {props.modalTitle}
          </Typography>
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          {props.canCancel && (
            <CustomButton
              {...props.cancelModalButton}
              onClick={
                props.cancelModalButton && props.cancelModalButton.onClick
              }
            >
              {props.cancelModalButton && props.cancelModalButton.title}
            </CustomButton>
          )}
          {props.canConfirm && (
            <CustomButton
              onClick={
                props.confirmModalButton && props.confirmModalButton.onClick
              }
              {...props.confirmModalButton}
            >
              {props.confirmModalButton && props.confirmModalButton.title}
            </CustomButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
