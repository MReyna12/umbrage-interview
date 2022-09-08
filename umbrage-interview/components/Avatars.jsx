import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

function Avatars() {
  // State variable that will hold the array of objects fetched below
  const [avatars, setAvatar] = useState([]);

  const navigate = useNavigate();

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
      const arrayOfPeople = data.people.map((person) => person);
      setAvatar(arrayOfPeople);
    } catch (err) {
      console.error(err);
    }
  };

  // Because we only need to make the GET request once, an empty dependency array is used to call fetchAvatars on page load
  useEffect(() => {
    fetchAvatars();
  }, []);

  // Send the userId associated with the Detailed View button upon routing to /detailedview.
  // This allows for a fetch request to be made to obtain user comments and other user info for the user associated with the aforementioned userId.
  const handleClick = async (event) => {
    event.persist();
    const id = event.currentTarget.id;
    navigate("/detailedview", { state: { userId: id } });
  };

  // Map through the array of avatars to create a "list" of users fetched from the API above
  // Because it is not a guarantee there will be a image associated with each user, the img element only renders if avatar.avatar is truthy
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
