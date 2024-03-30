import { useState } from "react";
import styles from "../../styles/form.module.css";

const SignupForm = () => {
  const [userInputs, setUserInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <form className={styles.form}>
      <fieldset>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={userInputs.firstName}
          onChange={(e) =>
            setUserInputs((prevState) => {
              return {
                ...prevState,
                firstName: e.target.value,
              };
            })
          }
          minLength={5}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={userInputs.lastName}
          onChange={(e) =>
            setUserInputs((prevState) => {
              return {
                ...prevState,
                lastName: e.target.value,
              };
            })
          }
          minLength={5}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={userInputs.email}
          onChange={(e) =>
            setUserInputs((prevState) => {
              return {
                ...prevState,
                email: e.target.value,
              };
            })
          }
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={userInputs.password}
          onChange={(e) =>
            setUserInputs((prevState) => {
              return {
                ...prevState,
                password: e.target.value,
              };
            })
          }
          minLength={6}
          required
        />
      </fieldset>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
