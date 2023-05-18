import axios from "axios";
import fetch from "isomorphic-fetch";

let API = "https://student-portal-mobile-app.onrender.com/api/v1";
let API_local = "http://10.0.2.2:3000/api/v1";

export const createResult = async (data, token) => {
  let url = `${API}/results`;
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
export const allResults = async (paramsData) => {
  console.log(paramsData, "\n params data \n");
  let url = `${API}/results`;
  // let url = `${API}/materials`;
  return axios(url, {
    method: "GET",
    params: {
      student: paramsData.student,
      module: paramsData.module,
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
export const oneResult = async (id) => {
  let url = `${API}/results/${id}`;
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
export const updateResult = async (id, data) => {
  let url = `${API}/results/${id}`;
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
export const deleteResult = async (id, data) => {
  let url = `${API}/results/${id}`;
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
