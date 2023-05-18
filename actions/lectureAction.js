import axios from "axios";
import fetch from "isomorphic-fetch";

let API = "https://student-portal-mobile-app.onrender.com/api/v1";
let API_local = "http://10.0.2.2:3000/api/v1";

export const createLecture = async (data, token) => {
  let url = `${API}/lectures`;
  // let url = `${API}/materials`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const allLectures = async (paramsData) => {
  console.log(paramsData, "\n all lectures \n");
  let url = `${API}/lectures`;
  // let url = `${API}/materials`;
  return axios(url, {
    method: "GET",
    params: {
      badge: paramsData.badge,
      degree: paramsData.degree,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const oneLecture = async (id) => {
  let url = `${API}/lectures/${id}`;
  // let url = `${API}/materials`;
  return fetch(url, {
    method: "GET",
    headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const updateLecture = async (id, data) => {
  let url = `${API}/lectures/${id}`;
  // let url = `${API}/materials`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const deleteLecture = async (id, data) => {
  let url = `${API}/lectures/${id}`;
  // let url = `${API}/materials`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
