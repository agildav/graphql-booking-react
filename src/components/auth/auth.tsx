import React, { FormEvent, SyntheticEvent } from "react";
import FetchService from "../../shared/fetch.service";
import { CustomButton } from "../../shared/components/button.component";
import { CustomInputTextField } from "../../shared/components/input.component";
import { IUser } from "../user/user.model";
import { IAuthProps, IAuth, IAuthInput, IAuthState } from "./auth.model";
import { toast } from "react-toastify";
import { IAppState } from "../../app/App.model";
import { HTMLElementEvent } from "../../shared/adapter.model";
import "./auth.scss";

/** Authentication component */
class Auth extends React.Component<IAuthProps, IAuthState> {
  initialState: IAuthState = {
    // Input fields
    email: "",
    password: "",

    // Auth fields
    token: "",
    tokenExpiration: "",
    userId: "",
    isHandlingAuth: false
  };

  constructor(props: IAuthProps) {
    super(props);

    this.state = this.initialState;
  }

  /** Re-starts the state */
  initState = () => {
    this.setState((state: IAuthState) => {
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
  isValidUserInput(userInput: IAuthInput): boolean {
    const { email, password } = userInput;
    if (email.length < 1 || password.length < 1) {
      return false;
    }
    return true;
  }

  /** signs up a user */
  register = async (userInput: IAuthInput) => {
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
      const response = await FetchService.fetchServer(requestBody);

      if (response.errors) {
        toast.error("That email is already registered!");

        return this.setState((state: IAuthState) => {
          return {
            isHandlingAuth: false
          };
        });
      }

      const user: { registerUser: IUser } = response.data;
      if (!user) {
        throw new Error("An error occurred while signing up");
      }

      return this.setState(
        (state: IAuthState) => {
          return {
            userId: user.registerUser._id,
            email: user.registerUser.email,
            password: ""
          };
        },
        async () => {
          try {
            await this.login(userInput);

            return;
          } catch (error) {
            return;
          }
        }
      );
    } catch (error) {
      toast.error("Sorry, could not register");

      throw error;
    }
  };

  /** signs in a user */
  login = async (userInput: IAuthInput) => {
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
            login(authInput: {email: "${userInput.email}", password: "${userInput.password}"})
            ${wantedFields}
          }
          `
    };

    try {
      const response = await FetchService.fetchServer(requestBody);

      if (response.errors) {
        toast.error("Invalid credentials");

        return this.setState((state: IAuthState) => {
          return {
            isHandlingAuth: false
          };
        });
      }

      const user: { login: IAuth } = response.data;
      if (!user) {
        throw new Error("An error occurred while signing in");
      }

      toast.success("Welcome to gEvent!");

      return this.setState(
        (state: IAuthState) => {
          return {
            userId: user.login.userId,
            email: userInput.email,
            password: "",
            token: user.login.token,
            tokenExpiration: user.login.tokenExpiration,
            isHandlingAuth: false
          };
        },
        () => {
          this.props.authUser(this.state);
          return;
        }
      );
    } catch (error) {
      toast.error("Sorry, could not login");

      throw error;
    }
  };

  /** register or sign in user */
  handleAuthUser = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    return this.setState(
      (state: IAuthState) => {
        return {
          isHandlingAuth: true
        };
      },
      async () => {
        // sanitize
        const userInput: IAuthInput = {
          email: this.state.email.trim(),
          password: this.state.password.trim()
        };

        try {
          const valid = this.isValidUserInput(userInput);

          if (!valid) {
            throw new Error("invalid user input");
          }
        } catch (error) {
          toast.error("Invalid credentials");

          return this.setState((state: IAuthState) => {
            return {
              isHandlingAuth: false
            };
          });
        }

        // Choose between register | login
        const { navigation } = this.props.appState;
        if (navigation.isAtRegister || navigation.isAtLogin) {
          try {
            if (navigation.isAtRegister) {
              await this.register(userInput);
              return;
            } else {
              await this.login(userInput);
              return;
            }
          } catch (error) {
            return this.setState((state: IAuthState) => {
              return {
                isHandlingAuth: false
              };
            });
          }
        } else {
          // Invalid route for this handler
          toast.error("An error occurred");

          return this.setState((state: IAuthState) => {
            return {
              isHandlingAuth: false
            };
          });
        }
      }
    );
  };

  render() {
    const appState: IAppState = this.props.appState;

    return (
      <form id="Auth" onSubmit={this.handleAuthUser}>
        <div className="form-control">
          <CustomInputTextField
            autoComplete="on"
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
            autoComplete="on"
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
            disabled={this.state.isHandlingAuth}
            size="medium"
            type="submit"
            variant="contained"
            color="primary"
          >
            {appState.navigation.isAtLogin && "Login"}
            {appState.navigation.isAtRegister && "Register"}
          </CustomButton>
        </div>
      </form>
    );
  }
}

export default Auth;
