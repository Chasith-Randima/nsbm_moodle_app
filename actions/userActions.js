import axios from "axios";
import fetch from "isomorphic-fetch";

let API = "https://student-portal-mobile-app.onrender.com/api/v1";
let API_local = "http://10.0.2.2:3000/api/v1";

export const createUser = async (data, token) => {
  let url = `${API}/users`;
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
export const allUsers = async (paramsData) => {
  console.log(paramsData, "\n all lectures \n");
  let url = `${API}/users`;
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
export const oneUser = async (id, token) => {
  let url = `${API}/users/${id}`;
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
export const updateUser = async (id, data) => {
  let url = `${API}/users/${id}`;
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
export const deleteUser = async (id, data) => {
  let url = `${API}/users/${id}`;
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

export const updateUserPassword = (id, user, token) => {
  console.log(id, user, token);
  let url = `${API}/users/updateMyPassword/${id}`;
  // console.log(id, user, token);

  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
