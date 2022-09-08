import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function DetailedView() {
  const [person, setPerson] = useState({});
  const [comments, setComments] = useState([]);

  const location = useLocation();
  const userId = location.state.userId;

  useEffect(() => {
    const personUrl = `https://umbrage-interview-api.herokuapp.com/people/${userId}`;
    const settings = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const fetchPerson = async () => {
      try {
        const response = await fetch(personUrl, settings);
        const data = await response.json();
        const newState = data.person;
        const newComments = data.person.comments.map(
          (comment) => comment.comment
        );
        setComments(newComments);
        setPerson(newState);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPerson();
  }, []);

  const userComments = comments.map((comment) => {
    return <p>{comment}</p>;
  });

  return (
    <div>
      {person.avatar && <img src={person.avatar} />}
      <h1>
        {person.first_name} {person.last_name}
      </h1>
      <p>{person.job_title}</p>
      {userComments}
    </div>
  );
}

export default DetailedView;
