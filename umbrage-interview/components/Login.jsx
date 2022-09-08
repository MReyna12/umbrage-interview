import { useState } from "react";
import { useAuth } from "../hooks/auth";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const auth = useAuth();

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    auth.login({ username: formData.username, password: formData.password });
  }

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <form
            className="columns is-justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="column is-two-fifths-tablet">
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    placeholder="Enter username"
                    onChange={handleChange}
                    name="username"
                    value={formData.username} // Tells the input box what to display rather than the input box telling the state what to display
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
