import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import Nav from "./Nav";

function DetailedView() {
  const [person, setPerson] = useState({});
  const [comments, setComments] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const userId = location.state.userId;
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
        const userData = data.person;
        const arrayOfComments = data.person.comments.map(
          (comment) => comment.comment
        );
        setComments(arrayOfComments);
        setPerson(userData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPerson();
  }, []);

  const userComments = comments.map((comment) => {
    return (
      <article key={nanoid()} className="message is-danger">
        <div className="message-header">
          <h2>Comment by {person.first_name}</h2>
        </div>
        <div className="message-body">{comment}</div>
      </article>
    );
  });

  return (
    <>
      <Nav />
      <section className="section">
        <div className="container">
          <div className="is-flex is-flex-direction-column is-align-items-center">
            {person.avatar && <img src={person.avatar} />}
            <h1 className="title is-spaced is-size-4 my-3">
              {person.first_name} {person.last_name}
            </h1>
            <h3 className="subtitle is-size-6 has-text-weight-bold">
              {person.job_title}
            </h3>
            <div className="columns">
              <div className="column ">{userComments}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailedView;
