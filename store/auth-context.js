import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  user: "",
  // user: () => {},
  degree: "",
  badge: "",
  // jUser: {},
  // jauth: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userData, setUserData] = useState("");
  const [degreeData, setDegreeData] = useState("");
  const [badgeData, setBadgeData] = useState("");
  const [fetchedData, setFetchedData] = useState({
    token: "",
    data: "",
    degree: "",
    badge: "",
  });
  // const [juser, setJuser] = useState();

  function authenticate(token, data, degree, badge) {
    // function authenticate(token, data) {
    // setJuser(JSON.parse(data));
    // const setData = async () => {
    console.log(
      token,
      typeof data,
      typeof degree,
      typeof badge,
      "from context"
    );
    setFetchedData({
      token: token,
      data: data,
      degree: degree,
      badge: badge,
    });
    setAuthToken(token);
    console.log("\n token done\n");
    setUserData(data);
    console.log("\n user done\n");
    setDegreeData(degree);
    console.log("\n degree done\n");
    setBadgeData(badge);
    console.log("\n badge done\n");
    AsyncStorage.setItem("token", token);
    console.log("\n async token done\n");
    AsyncStorage.setItem("user", data);
    console.log("\n async data done\n");
    AsyncStorage.setItem("degree", degree);
    console.log("\n degree done\n");
    AsyncStorage.setItem("badge", badge);
    console.log("\n badge done\n");

    console.log(
      "\n ----------------------",
      authToken,
      userData,
      degreeData,
      badgeData,
      "\n async storage after..... ----------------------"
    );
    // };

    // setData();
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("degree");
    AsyncStorage.removeItem("badge");
  }
  // function jauth(data) {
  //   setJuser(data);
  // }

  const value = {
    token: authToken,
    user: userData,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    degree: degreeData,
    badge: badgeData,
    // jUser: juser,
  };
  useEffect(() => {
    if (fetchedData.token) {
      setAuthToken(fetchedData.token);
      console.log("\n token done\n");
      setUserData(fetchedData.data);
      console.log("\n user done\n");
      setDegreeData(fetchedData.degree);
      console.log("\n degree done\n");
      setBadgeData(fetchedData.badge);
      console.log("\n badge done\n");
      AsyncStorage.setItem("token", fetchedData.token);
      console.log("\n async token done\n");
      AsyncStorage.setItem("user", fetchedData.data);
      console.log("\n async data done\n");
      AsyncStorage.setItem("degree", fetchedData.degree);
      console.log("\n degree done\n");
      AsyncStorage.setItem("badge", fetchedData.badge);
      console.log("\n badge done\n");
    }
  }, [fetchedData]);
  console.log(
    "\n",
    fetchedData.badge,
    fetchedData.data,
    fetchedData.degree,
    fetchedData.token,
    "\n fetched data......"
  );
  console.log(
    "\n",
    value.token,
    value.user,
    value.isAuthenticated,
    authenticate,
    value.badge,
    value.degree,
    "\n user after setting from context....."
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
