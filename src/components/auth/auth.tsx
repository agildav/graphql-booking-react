import React, { FormEvent, SyntheticEvent } from "react";
import FetchService from "../../shared/fetch.service";
import { CustomButton } from "../../shared/components/button.component";
import { CustomInputTextField } from "../../shared/components/input.component";
import { IUserInput, IUser } from "../user/user.model";
import { IAuthProps, IAuthState, HTMLElementEvent } from "./auth.model";
import { toast } from "react-toastify";

import "./auth.css";

/** Authentication component */
class Auth extends React.Component<IAuthProps, IAuthState> {
  initialState: IAuthState = {
    _id: "",
    email: "",
    password: "",
    username: "",
    createdAt: "",
    createdEvents: []
  };

  constructor(props: IAuthProps) {
    super(props);

    this.state = this.initialState;
  }

  /** Re-starts the state */
  initState = async () => {
    await this.setState((state: IAuthState) => {
      return this.initialState;
    });
  };

  /** Handles events on the user email input */
  onEmailInputChange = (event: SyntheticEvent) => {
    event.persist();

    const target: HTMLElementEvent = event.target;

    this.setState((state: IAuthState) => {
      return {
        email: target.value
      };
    });
  };

  /** Handles events on the user password input */
  onPasswordInputChange = (event: SyntheticEvent) => {
    event.persist();

    const target: HTMLElementEvent = event.target;

    this.setState((state: IAuthState) => {
      return {
        password: target.value
      };
    });
  };

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
      email: this.state.email,
      password: this.state.password
    };

    try {
      const valid = await this.isValidUserInput(userInput);

      if (!valid) {
        throw new Error("invalid user input");
      }
    } catch (error) {
      await toast.error("Invalid credentials");

      await this.initState();
      return;
    }

    const wantedFields = `
    {
      _id
      email
      username
      createdAt
      password
    }
    `;

    const requestBody = {
      query: `
      mutation {
        registerUser(userInput: {email: "${userInput.email}", password: "${userInput.password}"}) ${wantedFields}
      }
      `
    };

    try {
      // Todo: Use a spinner while fetching
      const response = await FetchService.fetchServer(requestBody);

      if (response.errors) {
        toast.error("Invalid credentials");
        return;
      }

      const user: IUser = response.data.registerUser;
      if (user) {
        console.log(user);
      }

      // Todo: dont keep password
      // await this.setState((state: IAuthState) => {
      //   return this.initialState;
      // });

      return;
    } catch (error) {
      toast.error("An error occurred");

      await this.initState();
      return;
    }
  };

  render() {
    return (
      <form id="Auth" onSubmit={this.registerUser}>
        <div className="form-control">
          <CustomInputTextField
            onChange={this.onEmailInputChange}
            label="Email"
            type="email"
            name="email"
            id="email"
            margin="dense"
          />
        </div>
        <div className="form-control">
          <CustomInputTextField
            onChange={this.onPasswordInputChange}
            label="Password"
            type="password"
            name="password"
            id="password"
            margin="dense"
          />
        </div>
        <div className="form-actions">
          <CustomButton
            size="medium"
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </CustomButton>
        </div>
      </form>
    );
  }
}

export default Auth;
