import React, { FormEvent } from "react";
import FetchService from "../../shared/fetch.service";
import { CustomButton } from "../../shared/button.component";
import { IUserInput, IUser } from "../user/user.model";
import "./auth.css";

/** Authentication component */
class Auth extends React.Component {
  emailElement: React.RefObject<any>;
  passwordElement: React.RefObject<any>;

  constructor(props: any) {
    super(props);

    this.emailElement = React.createRef();
    this.passwordElement = React.createRef();
  }

  /** checks if the user credentials are valid */
  isValidUserInput(userInput: IUserInput): boolean {
    if (
      userInput.email.trim().length === 0 ||
      userInput.password.trim().length === 0
    ) {
      return false;
    }
    return true;
  }

  /** registers a user */
  registerUser = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const userInput: IUserInput = {
      email: this.emailElement.current.value,
      password: this.passwordElement.current.value
    };

    try {
      const valid = await this.isValidUserInput(userInput);

      if (!valid) {
        throw new Error("invalid user input");
      }
    } catch (error) {
      console.log(error);

      // Todo: Do something when invalid data
      return error;
    }

    const wantedFields = `
    {
      _id
      email
      username
      createdAt
    }
    `;

    const requestBody = {
      query: `
      mutation {
        registerUser(userInput: {email: "${userInput.email}", password: "${userInput.password}"}) ${wantedFields}
      }
      `
    };

    // Todo: Do something with the data
    try {
      // Todo: Use a spinner while fetching
      const data: IUser = await FetchService.fetchServer(requestBody);
      console.log(data);

      return;
    } catch (error) {
      return error;
    }
  };

  render() {
    return (
      <form id="Auth" onSubmit={this.registerUser}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="Email" id="email" ref={this.emailElement} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="Password"
            id="password"
            ref={this.passwordElement}
          />
        </div>
        <div className="form-actions">
          <CustomButton type="button" theme="other">
            Switch to login
          </CustomButton>
          <CustomButton type="submit" theme="default">
            Submit
          </CustomButton>
        </div>
      </form>
    );
  }
}

export default Auth;
