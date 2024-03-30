import { useState } from "react";
import { useRegisterMutation } from "../../redux/features/auth/authApiSlice";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

import styles from "../../styles/form.module.css";

const SignupForm = () => {
  const navigate = useNavigate();

  const [userInputs, setUserInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [register, { isError, isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await register({
        first_name: userInputs.firstName,
        last_name: userInputs.lastName,
        email: userInputs.email,
        password: userInputs.password,
      });

      const accessToken = data.accessToken;

      if (accessToken) {
        Cookies.set("accessToken", accessToken);

        setUserInputs({
          email: "",
          first_name: "",
          last_name: "",
          password: "",
        });

        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Create Account"}
        </button>
      </form>
      {isError && error && <p className={styles.error}>{error.data.message}</p>}
    </>
  );
};

export default SignupForm;
