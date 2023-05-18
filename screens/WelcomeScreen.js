import { Text, StyleSheet, View } from "react-native";
import ModuleItem from "../components/ModuleItem";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { allModules } from "../actions/moduleAction";
import LoadingOverlay from "../components/LoadingOverlay";
import { ScrollView } from "react-native-gesture-handler";

const WelcomeScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  // console.log("\n welcome screen", authCtx.token, "\n welcome screen");
  // console.log("\n welcome screen", authCtx.degree, "\n welcome screen");
  // console.log("\n welcome screen", authCtx.badge, "\n welcome screen");
  // console.log("\n welcome screen", authCtx.user, "\n welcome screen");
  // console.log("\n welcome screen", typeof authCtx.user, "\n welcome screen");
  // console.log(
  //   "\n welcome screen",
  //   typeof JSON.parse(authCtx.user),
  //   "\n welcome screen"
  // );

  const [user, setUser] = useState(JSON.parse(authCtx.user));
  // console.log(authCtx.user);
  const [allData, setAllData] = useState();
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });
  useEffect(() => {
    setUser(JSON.parse(authCtx.user));
    // console.log(authCtx.user.badge, authCtx.user.degree, authCtx.user);
    // console.log(JSON.parse(authCtx.user));
    // console.log(JSON.parse(authCtx.user)._id);
    // setUser(JSON.parse(authCtx.user));
    // let paramsData = {
    //   badge: JSON.parse(authCtx.user).badge,
    //   degree: JSON.parse(authCtx.user).degree,
    // };
    handleSubmit();
  }, [navigation]);

  const handleSubmit = async () => {
    // if (e) {
    //   e.preventDefault();
    // }
    setAlert({ ...alert, loading: true });
    let badge;
    let degree;
    let paramsData = {
      badge: badge,
      degree: degree,
      // badge: user.badge,
      // degree: user.degree,
    };

    console.log(user.role);

    if (user.role == "student") {
      paramsData.badge = user.badge.trim();
      paramsData.degree = user.degree.trim();
    }
    console.log(paramsData);

    // let token = getCookie("token_user");

    // console.log(params, "submit clicked...");
    await allModules(paramsData)
      .then((data) => {
        // console.log(data);
        if (data.status && data.status == "success") {
          if (data) {
            // console.log(data);
            setAllData(data);
            // console.log(data.totalCount);
            // let totalCount = data.totalCount;
            // setTotalPages(Math.ceil(totalCount / limit));
            // setShow(false);
          }
          setAlert({
            ...alert,
            loading: false,
            message: data && data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);
        }

        // return { data };
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  };

  // if (alert.loading) {
  //   return <LoadingOverlay message="Loading data..." />;
  // }
  return (
    <>
      <ScrollView style={styles.mainScreen}>
        {allData &&
          allData.doc.map((module, index) => (
            <ModuleItem key={index} module={module} />
          ))}

        {/* <ModuleItem /> */}
      </ScrollView>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    padding: 16,
    paddingBottom: 30,
  },
});
