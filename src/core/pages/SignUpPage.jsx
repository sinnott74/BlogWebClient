import React from "react";
import Card from "core/components/Card";
import { connect } from "react-redux";
import { signUp } from "core/ducks/auth";
import { Redirect } from "react-router";
import SubmitButton from "core/components/SubmitButton";
import TextField from "react-md/lib/TextFields/TextField";
import { DatePicker } from "react-md/lib/Pickers";
import FontIcon from "react-md/lib/FontIcons/FontIcon";

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Register User";
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, firstname, lastname, dob } = this.state;
    if (username && password && firstname && lastname && dob) {
      this.props.handleSubmit({
        username,
        password,
        firstname,
        lastname,
        dob
      });
    }
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to={this._getRedirectUrl()} />;
    }

    return (
      <Card>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="username"
            type="email"
            name="username"
            label="Username"
            required
            leftIcon={<FontIcon>email</FontIcon>}
            autoComplete="email"
            value={this.state.username}
            onChange={(username, e) => {
              this.setState({ username });
            }}
          />
          <TextField
            type="password"
            name="password"
            id="password"
            label="Password"
            required
            leftIcon={<FontIcon>lock</FontIcon>}
            autoComplete="new-password"
            value={this.state.password}
            onChange={(password, e) => {
              this.setState({ password });
            }}
          />
          <TextField
            type="text"
            name="firstname"
            id="firstname"
            label="Firstname"
            required
            autoComplete="given-name"
            leftIcon={<FontIcon>face</FontIcon>}
            value={this.state.firstname}
            onChange={(firstname, e) => {
              this.setState({ firstname });
            }}
          />
          <TextField
            type="text"
            name="lastname"
            id="lastname"
            label="Lastname"
            required
            autoComplete="family-name"
            leftIcon={<FontIcon>face</FontIcon>}
            value={this.state.lastname}
            onChange={(lastname, e) => {
              this.setState({ lastname });
            }}
          />
          <DatePicker
            id="DateOfBirthPicker"
            label="Date of Birth"
            required
            autoComplete="bday"
            showAllDays
            disableOuterDates
            autoOk
            maxDate={new Date()} // today
            value={this.state.dob}
            onChange={(dobString, dob, e) => {
              this.setState({ dob });
            }}
          />

          <SubmitButton isSubmitting={this.props.isSubmitting}>
            Sign Up
          </SubmitButton>
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
  handleSubmit: signUp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage);
