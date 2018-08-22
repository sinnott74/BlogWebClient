import React from "react";
import Card from "core/components/Card";
// import Link from "core/components/Link";
import { connect } from "react-redux";
import { login } from "core/ducks/auth";
import { Redirect } from "react-router";
import SubmitButton from "core/components/SubmitButton";
import TextField from "react-md/lib/TextFields/TextField";
import FontIcon from "react-md/lib/FontIcons/FontIcon";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Log In";
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      this.props.handleLogin(username, password);
    }
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to={this._getRedirectUrl()} />;
    }

    return (
      <Card>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <TextField
            type="email"
            name="username"
            label="Username"
            required
            leftIcon={<FontIcon>email</FontIcon>}
            value={this.state.username}
            autoComplete="email"
            onChange={(username, e) => {
              this.setState({ username });
            }}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            required
            leftIcon={<FontIcon>lock</FontIcon>}
            autoComplete="current-password"
            value={this.state.password}
            onChange={(password, e) => {
              this.setState({ password });
            }}
          />
          {/* <Button raised={true} primary type="submit">Login</Button> */}
          <SubmitButton isSubmitting={this.props.isSubmitting}>
            Login
          </SubmitButton>
          {/* <Link to="/signup">Sign Up</Link> */}
        </form>
      </Card>
    );
  }

  _getRedirectUrl() {
    var { from } = this.props.location.state || { from: { pathname: "/" } };
    let forwardUrl = from;
    return forwardUrl;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  isSubmitting: state.auth.isLoading
});

const mapDispatchToProps = {
  handleLogin: login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
