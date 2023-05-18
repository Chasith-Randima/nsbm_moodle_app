import axios from "axios";
import fetch from "isomorphic-fetch";

let API = "https://student-portal-mobile-app.onrender.com/api/v1";

export const logIn = async (user) => {
  console.log(user);
  let url = `${API}/users/login`;
  console.log(url);
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      //   console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
