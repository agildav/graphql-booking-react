import React from "react";
import "./button.component.css";

/** Custom props for this button */
interface CustomButtonProps {
  /** onClick event handler */
  onClick?: any;
  /** (default | danger | other) theme of button */
  theme: string;
  /** (button | reset | submit) type of button */
  type: "button" | "reset" | "submit" | undefined;
  /** children passed */
  children: any;
}

/** Custom button component */
export class CustomButton extends React.Component<CustomButtonProps> {
  render() {
    return (
      <button
        type={this.props.type}
        onClick={this.props.onClick}
        className={"btn btn-" + this.props.theme}
      >
        {this.props.children}
      </button>
    );
  }
}
