import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
  Image,
  TextInput,
} from "react-native";
import { Colors } from "../util/Colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState, useEffect, useContext } from "react";
import { logIn } from "../actions/authActions";
import LoadingOverlay from "../components/LoadingOverlay";

import { AuthContext } from "../store/auth-context";

const LogInScreen = () => {
  const authCtx = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const handleChangeInpts = (name, enteredText) => {
    setValues({ ...values, [name]: enteredText });
  };

  const handleSubmit = async () => {
    setAlert({ ...alert, loading: true });

    await logIn(values)
      .then((data) => {
        // console.log(data.data.user, "This is from login screen...");
        if (data.status && data.status == "success") {
          data.data.token = data.token;
          console.log(data.token, data.data.user);
          authCtx.authenticate(
            data.data.token,
            // data.data.user,
            JSON.stringify(data.data.user),
            data.data.user.degree,
            data.data.user.badge
            // data.data.user
          );
          // data = null;
          // authCtx.jauth(data.data.user);
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            // setAlert({ ...alert, success: false, message: "" });
            resetAlert();
          }, 1000);

          // console.log(data);
          // console.log(data.error);
          // authenticate(data.data, "user", () => {
          //   if (localStorage.getItem("user")) {
          //     Router.push(`/mainPage`);
          //   }
          // });
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });
  };

  if (alert.loading) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <>
      <View style={styles.mainScreen}>
        <View style={styles.textMain}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/nsbm.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welecome To NSBM Dle..</Text>
            <Text style={styles.subtitle}>Login to access your account</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View>
            {/* <CustomInput label="Email Address" />
            <CustomInput label="Password" /> */}

            <View style={styles.inputContainer}>
              <Text
                style={styles.label}
                //   style={[styles.label, isInvalid && styles.labelInvalid]}
              >
                Email Address
              </Text>
              <TextInput
                // style={[styles.input, isInvalid && styles.inputInvalid]}
                style={styles.input}
                // autoCapitalize={false}
                // autoCapitalize="none"
                // keyboardType={keyboardType}
                // secureTextEntry={secure}
                onChangeText={(enteredText) =>
                  handleChangeInpts("email", enteredText)
                }
                // value={""}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text
                style={styles.label}
                //   style={[styles.label, isInvalid && styles.labelInvalid]}
              >
                Password
              </Text>
              <TextInput
                // style={[styles.input, isInvalid && styles.inputInvalid]}
                style={styles.input}
                // autoCapitalize={false}
                // autoCapitalize="none"
                // keyboardType={keyboardType}
                // secureTextEntry={secure}
                onChangeText={(enteredText) =>
                  handleChangeInpts("password", enteredText)
                }
                // value={value}
              />
            </View>
            <View style={styles.buttonOuter}>
              <Text style={styles.loginBtn} onPress={handleSubmit}>
                Log In
              </Text>
            </View>

            {/* <Button title="Lecturers Login" /> */}
          </View>
          {/* <Button title="Student Login" /> */}
        </View>
      </View>
    </>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    padding: 16,
  },
  textMain: {
    flex: 1,
    marginHorizontal: 16,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    // margin: 16,
    paddingHorizontal: 16,
  },
  imageContainer: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // flex: 1,
    width: 250,
    height: "55%",
    // height: "70%",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.primary500,
  },
  subtitle: {
    fontSize: 20,
    color: Colors.primary500,
  },
  button: {
    borderRadius: 24,
    width: "80%",
    // marginHorizontal: 6,
    marginTop: 12,
    fontSize: 24,
  },
  buttonText: {
    fontSize: 24,
  },
  buttonOuter: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  loginBtn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.primary500,
    borderRadius: 10,
    fontWeight: "bold",
    color: "white",
  },
});
