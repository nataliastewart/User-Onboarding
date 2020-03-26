import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

//setting the schema -- choose the elements you want to validate
const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup
    .string()
    .email()
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  terms: yup.boolean().oneOf([true], "Please check the terms box")
});

export default function Form() {
  //state for whether the button should be disabled or not
  const [buttonDisabled, setButtonDisabled] = useState(true);

  /* Each time the form value state is updated, check to see if it is valid per our schema.
  This will allow us to enable/disable the submit button.*/
  useEffect(() => {
    /* We pass the entire state into the entire schema, no need to use reach here.
We want to make sure it is all valid before we allow a user to submit
isValid comes from Yup directly */
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  //Setting up final validation
  const validateChange = e => {
    // Reach will allow us to "reach" into the schema and test only one part.
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  //inputChange
  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

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

  //Form submit control
  const formSubmit = e => {
    e.preventDefault();
    console.log(">>>>Form submitted!<<<<<<<");
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <label htmlFor="name">
          Name:
          <input type="text" name="name" id="name" value={formState.name} />
        </label>
        <label htmlFor="email">
          Email:
          <input type="text" name="email" id="email" value={formState.email} />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            value={formState.password}
          />
        </label>
        <label htmlFor="terms" className="terms">
          Terms & Conditions
          <input type="checkbox" name="terms" checked={formState.terms} />
        </label>
        <button disabled={buttonDisabled}>Submit</button>
      </form>
    </div>
  );
}
