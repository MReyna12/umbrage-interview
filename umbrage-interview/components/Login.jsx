import { useState } from "react";
import { useAuth } from "../hooks/auth";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const auth = useAuth();

  // Updates the state of the formData each time a user presses a key inside of either input element
  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  // preventDefault used to stop the default behavior of: submitting the form, refreshing the page, and adding the submitted data to the url
  // auth.login() passes the data entered into the inputs and if the correct username/password are entered then the user will be allowed access to protected routes
  function handleSubmit(event) {
    event.preventDefault();
    auth.login({ username: formData.username, password: formData.password });
  }

  return (
    <section className="hero is-danger is-fullheight">
      <div className="hero-body">
        <div className="container is-flex is-justify-content-center">
          <div className="box">
            <h1 className="title has-text-black has-text-centered">
              Umbrage Interview Application
            </h1>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input is-danger"
                      type="text"
                      placeholder="Enter username"
                      onChange={handleChange}
                      name="username"
                      value={formData.username}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input is-danger"
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
                    <button className="button is-danger">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
