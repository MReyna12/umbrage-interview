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
                      value={formData.username} // Tells the input box what to display rather than the input box telling the state what to display
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
