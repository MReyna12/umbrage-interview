import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

function Avatars() {
  // State variable that will hold the array of objects fetched below
  const [avatars, setAvatar] = useState([]);

  const navigate = useNavigate();

  // Fetch the people object within useEffect hook or React will fetch the API over-and-over again
  useEffect(() => {
    const peopleUrl = "https://umbrage-interview-api.herokuapp.com/people";
    const settings = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const fetchAvatars = async () => {
      try {
        const response = await fetch(peopleUrl, settings);
        const data = await response.json();
        const newState = data.people.map((person) => person);
        setAvatar(newState);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAvatars();
  }, []);

  // Send the userId associated with the Detailed View button upon routing to /detailedview.
  // This allows for a fetch request to be made to obtain user comments and other user info.

  const handleClick = async (event) => {
    event.persist();
    const id = event.currentTarget.id;
    navigate("/detailedview", { state: { userId: id } });
  };

  const avatarList = avatars.map((avatar) => {
    return (
      <div
        key={avatar.id}
        className="column is-flex is-flex-direction-column is-align-items-center"
      >
        {avatar.avatar && <img src={avatar.avatar} />}
        <h1 className="title is-size-4 my-3">
          {avatar.first_name} {avatar.last_name}
        </h1>
        <button className="button is-dark" id={avatar.id} onClick={handleClick}>
          Detailed View
        </button>
      </div>
    );
  });

  return (
    <>
      <Nav />
      <section className="section">
        <div className="container">
          <div className="columns">{avatarList}</div>
        </div>
      </section>
    </>
  );
}

export default Avatars;
