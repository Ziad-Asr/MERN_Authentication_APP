import styles from "../../styles/form.module.css";

const SignupForm = () => {
  return (
    <form className={styles.form}>
      <fieldset>
        <label htmlFor="first_name">First Name</label>
        <input type="text" name="first_name" id="first_name" required />
      </fieldset>
      <fieldset>
        <label htmlFor="last_name">Last Name</label>
        <input type="text" name="last_name" id="last_name" required />
      </fieldset>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </fieldset>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
