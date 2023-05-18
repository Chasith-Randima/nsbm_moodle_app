import { Text, StyleSheet, View, Image } from "react-native";
import ModuleItem from "../components/ModuleItem";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { allModules } from "../actions/moduleAction";
import LoadingOverlay from "../components/LoadingOverlay";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../util/Colors";
import { oneUser } from "../actions/userActions";
import CustomButton from "../components/CustomButton";

const ProfileScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  //   console.log("\n welcome screen", authCtx.token, "\n welcome screen");
  //   console.log("\n welcome screen", authCtx.degree, "\n welcome screen");
  //   console.log("\n welcome screen", authCtx.badge, "\n welcome screen");
  //   console.log("\n welcome screen", authCtx.user, "\n welcome screen");
  //   console.log("\n welcome screen", typeof authCtx.user, "\n welcome screen");
  //   console.log(
  //     "\n welcome screen",
  //     typeof JSON.parse(authCtx.user),
  //     "\n welcome screen"
  //   );

  const [user, setUser] = useState(JSON.parse(authCtx.user));
  // console.log(authCtx.user);
  const [allData, setAllData] = useState();
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };
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
    let paramsData = {
      badge: authCtx.badge,
      degree: authCtx.degree,
      // badge: user.badge,
      // degree: user.degree,
    };

    console.log(user.role);

    if (user.role == "lecturer") {
      (paramsData.badge = undefined), (paramsData.degree = undefined);
    }
    let id = user._id;
    let token = authCtx.token;

    // let token = getCookie("token_user");

    // console.log(params, "submit clicked...");
    await oneUser(id, token)
      .then((data) => {
        // console.log(data);
        if (data.status && data.status == "success") {
          if (data) {
            console.log(data);
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
            resetAlert();
            // setAlert({ ...alert, success: false, message: "" });
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

  if (alert.loading) {
    return <LoadingOverlay message="Loading data..." />;
  }

  const updatePasswordScreen = () => {
    navigation.navigate("PasswordUpdate", {
      userId: allData.doc._id,
    });
    // navigation.navigate("WelcomeScreen");
  };
  return (
    <>
      <ScrollView style={styles.mainScreen}>
        {/* {allData &&
          console.log(
            `https://student-portal-mobile-app.onrender.com/api/v1/users/image/${allData.doc.images[0]}`
          )} */}
        <View>
          {allData && allData.doc.images ? (
            <Image
              style={styles.image}
              source={{
                uri: `https://student-portal-mobile-app.onrender.com/api/v1/users/image/${allData.doc.images[0]}`,
              }}
            />
          ) : (
            <Image
              style={styles.image}
              source={require("../assets/images/moduleCover.png")}
            />
          )}
        </View>
        <View>
          <View style={styles.itemContainer}>
            <Text>Name</Text>
            <Text
              style={styles.input}
              //   value={hall}
              //   onChangeText={(enteredText) =>
              //     // handleChangeInpts("title", enteredText)
              //     setValues({ ...values, hall: enteredText })
              //   }
            >
              {allData && allData.doc.username}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text>Email</Text>
            <Text
              style={styles.input}
              //   value={hall}
              //   onChangeText={(enteredText) =>
              //     // handleChangeInpts("title", enteredText)
              //     setValues({ ...values, hall: enteredText })
              //   }
            >
              {allData && allData.doc.email}
            </Text>
          </View>
          {user.role == "student" && (
            <View style={styles.itemContainer}>
              <Text>Badge</Text>
              <Text
                style={styles.input}
                //   value={hall}
                //   onChangeText={(enteredText) =>
                //     // handleChangeInpts("title", enteredText)
                //     setValues({ ...values, hall: enteredText })
                //   }
              >
                {allData && allData.doc.badge}
              </Text>
            </View>
          )}

          {user.role == "student" && (
            <View style={styles.itemContainer}>
              <Text>Degree</Text>
              <Text
                style={styles.input}
                //   value={hall}
                //   onChangeText={(enteredText) =>
                //     // handleChangeInpts("title", enteredText)
                //     setValues({ ...values, hall: enteredText })
                //   }
              >
                {allData && allData.doc.degree}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.createButtons}>
          <View style={styles.oneButton}>
            <CustomButton onPress={updatePasswordScreen}>
              Update Password
            </CustomButton>
          </View>
        </View>
        {/* {allData &&
          allData.doc.map((module, index) => (
            <ModuleItem key={index} module={module} />
          ))} */}
        {/* <ModuleItem /> */}
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    padding: 16,
    paddingBottom: 30,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 200,
    marginHorizontal: 15,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  itemContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
