import React, { FormEvent, SyntheticEvent } from "react";
import FetchService from "../../shared/fetch.service";
import { CustomButton } from "../../shared/components/button.component";
import { CustomInputTextField } from "../../shared/components/input.component";
import { IUserInput, IUser } from "../user/user.model";
import { IAuthProps, IAuthState, HTMLElementEvent } from "./auth.model";
import { toast } from "react-toastify";
import "./auth.css";

import { IAppState } from "../../app/App.model";

/** Authentication component */
class Auth extends React.Component<IAuthProps, IAuthState> {
  initialState: IAuthState = {
    // User fields
    _id: "",
    email: "",
    password: "",
    username: "",
    createdAt: "",
    createdEvents: [],
    // Auth fields
    token: "",
    tokenExpiration: "",
    userId: ""
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

  /** signs up a user */
  register = async (userInput: IUserInput) => {
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
        toast.error("That email is already registered!");
        // await this.initState();
        return;
      }

      const user: IUser = response.data;
      if (!user) {
        toast.error("An error occurred while signing up");
        // await this.initState();
        return;
      }

      toast.success("Welcome to gEvent!");
      console.log(user);
      // Todo: dont keep password
      // await this.setState((state: IAuthState) => {
      //   return this.initialState;
      // });

      return;
    } catch (error) {
      toast.error("Sorry, could not register");

      // await this.initState();
      return;
    }
  };

  /** signs in a user */
  login = async (userInput: IUserInput) => {
    const wantedFields = `
        {
          userId
          token
          tokenExpiration
        }
        `;

    const requestBody = {
      query: `
          query {
            login(authInput: {email: "${userInput.email}", password: "${userInput.password}"}) ${wantedFields}
          }
          `
    };

    try {
      // Todo: Use a spinner while fetching
      const response = await FetchService.fetchServer(requestBody);

      if (response.errors) {
        toast.error("Invalid credentials");
        // await this.initState();
        return;
      }

      const user: IAuthState = response.data;
      if (!user) {
        toast.error("An error occurred while signing in");
        // await this.initState();
        return;
      }

      toast.success("Welcome to gEvent!");
      console.log(user);
      // Todo: dont keep password
      // await this.setState((state: IAuthState) => {
      //   return this.initialState;
      // });

      return;
    } catch (error) {
      toast.error("Sorry, could not login");

      // await this.initState();
      return;
    }
  };

  /** register or sign in user */
  handleAuthUser = async (event: FormEvent): Promise<void> => {
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

      // await this.initState();
      return;
    }

    // Choose between register | login
    if (this.props.appState.isAtRegister || this.props.appState.isAtLogin) {
      if (this.props.appState.isAtRegister) {
        return this.register(userInput);
      } else {
        return this.login(userInput);
      }
    } else {
      // Invalid route for this handler
      await toast.error("An error occurred");

      // await this.initState();
      return;
    }
  };

  render() {
    const appState: IAppState = this.props.appState;
    return (
      <form id="Auth" onSubmit={this.handleAuthUser}>
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
            {appState.isAtLogin && "Login"}
            {appState.isAtRegister && "Register"}
          </CustomButton>
        </div>
      </form>
    );
  }
}

export default Auth;
