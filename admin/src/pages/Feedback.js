import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { GetFeedbacks } from "../APIs/AdminManager";
import {
  Navigation,
  MobileNavigationTop,
  MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/Feedback.css";

const Feedback = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const loadFeedback = () => {
    setLoading(true);

    GetFeedbacks(page)
      .then((response) => {
        console.log([...feedbacks, ...response.feedbacks]);
        setFeedbacks([...feedbacks, ...response.feedbacks]);
        setPage(parseInt(response.page) + 1);
      })
      .catch((err) => {
        alert("Unauthorized");
        if (err === "UNAUTH") {
          props.history.push("./");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  return (
    <div className="nav-container">
      <Navigation />
      <MobileNavigationTop />
      <div className="main">
        <h1>Feedbacks</h1>
        {feedbacks.map((item) => {
          return (
            <div class="feedbackContainer" key={item.id}>
              <div className="flex-row">
                <b>UserId:</b>
                <p className="lessHight">{item.userId}</p>
              </div>
              <div className="flex-row">
                <b>From App:</b>
                <p className="lessHight">{item.app}</p>
              </div>
              <div className="flex-row">
                <b>Date:</b>
                <p className="lessHight">
                  {new Date(parseInt(item.date)).toLocaleTimeString()},{" "}
                  {new Date(parseInt(item.date)).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-row">
                <b>Feedback:</b>
                <p className="lessHight">{item.feedback}</p>
              </div>
            </div>
          );
        })}

        {loading && <p style={{ marginBottom: "5em" }}>Loading...</p>}
        {!loading && feedbacks.length % 10 === 0 && (
          <button style={{ marginBottom: "5em" }} onClick={loadFeedback}>
            Load more
          </button>
        )}
      </div>
      <div className="footer">
        <MobileNavigationBottom />
      </div>
    </div>
  );
};

export default withRouter(Feedback);
