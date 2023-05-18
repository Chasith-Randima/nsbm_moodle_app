import axios from "axios";
import fetch from "isomorphic-fetch";

let API = "https://student-portal-mobile-app.onrender.com/api/v1";
let API_local = "http://10.0.2.2:3000/api/v1";

export const allModules = (paramsData) => {
  console.log(paramsData);
  let url = `${API}/modules`;
  //   console.log(paramsData, "This is from here...");

  return axios(url, {
    method: "GET",
    // params: { ...query },
    params: {
      badge: paramsData.badge,
      degree: paramsData.degree,
      // page: paramsData.page,
      // limit: paramsData.limit,
      // name: paramsData.name,
      // city: paramsData.city,
      //   brandname: paramsData.brandname,
      //   location: paramsData.location,
      //   "price[gte]": paramsData.priceMin,
      //   "price[lte]": paramsData.priceMax,
      //   sort: paramsData.sort,
    },
  })
    .then((response) => {
      // console.log(response.data, "lllllllllllllllllllllll");
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const oneModule = (id) => {
  // console.log(paramsData);
  let url = `${API}/modules/${id}`;
  //   console.log(paramsData, "This is from here...");

  return axios(url, {
    method: "GET",
    // params: { ...query },
    // params: {
    //   badge: paramsData.badge,
    //   degree: paramsData.degree,
    // page: paramsData.page,
    // limit: paramsData.limit,
    // name: paramsData.name,
    // city: paramsData.city,
    //   brandname: paramsData.brandname,
    //   location: paramsData.location,
    //   "price[gte]": paramsData.priceMin,
    //   "price[lte]": paramsData.priceMax,
    //   sort: paramsData.sort,
    // },
  })
    .then((response) => {
      // console.log(response.data, "lllllllllllllllllllllll");
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
