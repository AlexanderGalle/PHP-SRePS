import React, { useState } from "react";
import { Container, Input, FormControl, InputLabel } from "@material-ui/core";
import styles, { LoginButton, SignupButton } from "./styles";
import { Color } from "../../../common/";
import ProfilePicture from "../../../components/ProfilePicture";
import firebase from "firebase";

export default () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();

  const authenticateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => setLoading(false));
  };

  return (
    <Container>
      <form style={styles.formContainer} onSubmit={event => authenticateUser(event)}>
        <ProfilePicture />
        <p style={{ textAlign: "center", color: Color.lightGrey, paddingTop: 50 }}>
          {"Welcome! Please enter your details to login."}
        </p>
        <FormControl style={styles.inputGroup}>
          <InputLabel htmlFor="email_address">Email</InputLabel>
          <Input
            style={styles.input}
            id="email_address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl style={styles.inputGroup}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            style={styles.input}
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 30
          }}
        >
          <LoginButton type="submit">{loading ? "Loading" : "Login"}</LoginButton>
          <SignupButton>Sign Up</SignupButton>
        </FormControl>
      </form>
    </Container>
  );
};
