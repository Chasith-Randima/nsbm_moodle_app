import axios from "axios";
import fetch from "isomorphic-fetch";

let API = "https://student-portal-mobile-app.onrender.com/api/v1";
let API_local = "http://10.0.2.2:3000/api/v1";

export const createExam = async (data, token) => {
  // console.log(data, token, "create material action...");
  // console.log(data, token);
  let url = `${API}/exams`;
  // let url = `${API}/materials`;
  return fetch(url, {
    method: "POST",
    // headers: {
    //   //   Accept: "application/json",
    //   //   "Content-Type": "application/json",
    //   // "Content-Type": "multipart/form-data",
    //   Authorization: `Bearer ${token}`,
    // },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    // body: data,
    // body: JSON.stringify({
    //   title: "Semester end exam pusl2020",
    // badge: "21.1",
    // degree: "computer science plymouth",
    // examDate: "2022-02-02",
    // }),
    // body: JSON.stringify({ title: "thislskdjlfkjsdkljlkj" }),
    // body: { title: "this is a test " },
    // body: JSON.stringify(data),
  })
    .then((response) => {
      // console.log(response.json());
      // console.log(response.json(), "from material action.......");
      //   console.log(response.statusText);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
