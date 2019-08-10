import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CustomButton, CustomButtonProps } from "./button.component";

/** Custom props for modal dialog */
export interface CustomModalDialogProps {
  /** modal id */
  modalId?: string;
  /** modal title */
  modalTitle: string;
  /** open button for the modal */
  openModalButton: CustomButtonProps & {
    /** open button title */
    title?: string;
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

/** Custom modal state */
export interface CustomModalDialogState {
  isOpenModal: boolean;
}

/** Custom modal dialog opened by a custom button */
export class CustomModalDialog extends React.Component<
  CustomModalDialogProps,
  CustomModalDialogState
> {
  initialState: CustomModalDialogState = {
    isOpenModal: false
  };

  constructor(props: CustomModalDialogProps) {
    super(props);

    this.state = this.initialState;
  }

  handleClickOpen = () => {
    this.setState((state: any) => {
      return {
        isOpenModal: true
      };
    });
  };

  handleClose = () => {
    this.setState((state: any) => {
      return {
        isOpenModal: false
      };
    });
  };

  render() {
    const isOpenModal: boolean = this.state.isOpenModal;

    return (
      <div>
        <CustomButton
          {...this.props.openModalButton}
          onClick={this.handleClickOpen}
          disabled={isOpenModal}
        >
          {this.props.openModalButton.title}
        </CustomButton>
        <Dialog
          id={this.props.modalId}
          open={isOpenModal}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.props.modalTitle}
          </DialogTitle>
          <DialogContent>{this.props.children}</DialogContent>
          <DialogActions>
            {this.props.canCancel && (
              <CustomButton
                {...this.props.cancelModalButton}
                onClick={this.handleClose}
              >
                {this.props.cancelModalButton &&
                  this.props.cancelModalButton.title}
              </CustomButton>
            )}
            {this.props.canConfirm && (
              <CustomButton
                onClick={this.handleClose}
                {...this.props.confirmModalButton}
              >
                {this.props.confirmModalButton &&
                  this.props.confirmModalButton.title}
              </CustomButton>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
