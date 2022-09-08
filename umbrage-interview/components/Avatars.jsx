import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import settings from "../helpers/get-settings";

function Avatars() {
  // State variable that will hold the array of objects fetched below
  const [avatars, setAvatar] = useState([]);

  const navigate = useNavigate();

  // Fetch the people object within useEffect hook or React will fetch the API over-and-over again
  useEffect(() => {
    const peopleUrl = "https://umbrage-interview-api.herokuapp.com/people";

    const fetchAvatars = async () => {
      try {
        const response = await fetch(peopleUrl, settings.get);
        const data = await response.json();
        const newState = data.people.map((person) => person);
        setAvatar(newState);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAvatars();
  }, []);

  // Navigate after authorization

  const handleClick = async (event) => {
    event.persist();
    const id = event.currentTarget.id;
    navigate("/detailedview", { state: { userId: id } });
  };

  const avatarList = avatars.map((avatar) => {
    return (
      <div key={avatar.id}>
        {avatar.avatar && <img src={avatar.avatar} />}
        <h1>
          {avatar.first_name} {avatar.last_name}
        </h1>
        <button id={avatar.id} onClick={handleClick}>
          Detailed View
        </button>
      </div>
    );
  });

  return <>{avatarList}</>;
}

export default Avatars;
