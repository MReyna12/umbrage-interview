import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import Nav from "./Nav";

function DetailedView() {
  const [person, setPerson] = useState({});
  const [comments, setComments] = useState([]);

  // useLocation hook is used to grab the userId that was generated in the Avatars.jsx file when clicking a "Detailed View" button.
  // The userId can then be used as part of the personUrl which will allow us to fetch user info + comments from said user
  const location = useLocation();

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

  // fetchPerson() only called on page load because there is an empty dependency array and we only need the data to be fetched one time
  useEffect(() => {
    fetchPerson();
  }, []);

  // Creates a list of user comments. Nanoid generates a unique key for each item, which allows React to identify which items from the list have changed, are added, or are removed.
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
