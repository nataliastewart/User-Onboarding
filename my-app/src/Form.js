import React from "react";
import * as yup from "yup";

export default function Form() {
  //managing state for my inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });

  //setting state for errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });

  return (
    <div>
      <form>
        <label htmlFor="name">
          Name:
          <input type="text" name="name" id="name" />
        </label>
        <label htmlFor="email">
          Email:
          <input type="text" name="email" id="email" />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" id="password" />
        </label>
        <label htmlFor="terms" className="terms">
          Terms & Conditions
          <input type="checkbox" name="terms" checked={true} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
