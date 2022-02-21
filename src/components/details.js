import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Details() {
  let history = useHistory();
  const [id, setID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setCheckbox(localStorage.getItem("Checkbox Value"));
    axios
      .get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`)
      .then((getData) => {
        setAPIData(getData.data);
        console.log(id, "cscs");
      });
  }, [id]);

  return (
    <div>
      <div className="create-form">
        <div>
          <h2>{APIData.firstName}</h2>
        </div>
        <div>
          <h2>{APIData.lastName}</h2>
        </div>
      </div>
    </div>
  );
}
