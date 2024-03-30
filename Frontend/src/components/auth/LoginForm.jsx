import styles from "../../styles/form.module.css";

const LoginForm = () => {
  return (
    <form className={styles.form}>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </fieldset>
      <button type="submit">Signin</button>
    </form>
  );
};

export default LoginForm;
