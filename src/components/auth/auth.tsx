import React from "react";
import { CustomButton } from "../../shared/button.component";
import "./auth.css";

/** Authentication component */
class Auth extends React.Component {
  render() {
    return (
      <section id="Auth">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="Email" id="email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="Password" id="password" />
        </div>
        <div className="form-actions">
          <CustomButton type="button" theme="other">
            Switch to signup
          </CustomButton>
          <CustomButton type="button" theme="default">
            Submit
          </CustomButton>
        </div>
      </section>
    );
  }
}

export default Auth;
