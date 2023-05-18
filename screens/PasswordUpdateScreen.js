import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { updateUserPassword } from "../actions/userActions";

import { Colors } from "../util/Colors";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
// import DocumentPicker from "react-native-document-picker";
import { createMaterial, createMaterialFile } from "../actions/materialAction";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/LoadingOverlay";

const PasswordUpdateScreen = ({ route, navigation }) => {
  const authCtx = useContext(AuthContext);
  const userId = route.params.userId;

  // console.log(authCtx.token, typeof authCtx.token);

  // const [token, setToken] = useState(authCtx.token);

  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Update Password",
      // headerRight: () => {
      //   return (
      //     <IconButton
      //       icon={mealIsFavoite ? "star" : "star-outline"}
      //       color={"white"}
      //       onPress={changeFavoriteStatusHandler}
      //     />
      //   );
      // },
    });
  }, [navigation]);

  //   useEffect(() => {
  //     setValues({ ...values, formData: new FormData() });
  //   }, []);

  const { currentPassword, password, confirmPassword } = values;

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const handleSubmit = async () => {
    console.log("clicked...");
    setAlert({ ...alert, loading: true });
    // console.log(docImage, "submit..");
    let data = {
      currentPassword: currentPassword,
      password: password,
      passwordConfirm: confirmPassword,
    };
    // let data = { title: title };
    // for (const key in data) {
    //   console.log(key, data[key]);
    //   formData.append(key, data[key]);
    //   // setValues({ ...values, formData });
    //   // console.log(`${key}: ${phone[key]}`);
    // }

    // console.log(typeof values.formData);

    let token = authCtx.token;
    // await createMaterialFile(values.formData, token)
    await updateUserPassword(userId, data, token)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          if (data) {
            console.log(data);
            // setAllData(data);
            // console.log(data.totalCount);
            // let totalCount = data.totalCount;
            // setTotalPages(Math.ceil(totalCount / limit));
            // setShow(false);
          }
          setValues({ currentPassword: "", password: "", confirmPassword: "" });
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

        return { data };
      })
      .catch((err) => {
        console.log(err);
        setValues({ title: "", formData: new FormData() });
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
    return <LoadingOverlay message="Updating Password..." />;
  }
  if (alert.success) {
    return <LoadingOverlay message={alert.message} />;
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          {/* <CustomInput label="Title"  /> */}

          <View style={styles.inputContainer}>
            {/* <Text
                style={styles.label}
                //   style={[styles.label, isInvalid && styles.labelInvalid]}
              >
                File
              </Text>*/}
            {/* <Button title="Select Document" onPress={() => selectDoc()} /> */}
            <Text>Current Password</Text>
            <TextInput
              // style={[styles.input, isInvalid && styles.inputInvalid]}
              style={styles.input}
              value={currentPassword}
              onChangeText={(enteredText) =>
                // handleChangeInpts("title", enteredText)
                setValues({ ...values, currentPassword: enteredText })
              }
              // autoCapitalize={false}
              // autoCapitalize="none"
              // keyboardType={keyboardType}
              // secureTextEntry={secure}
              // onChangeText={onChangeText}
              // value={value}
            />
            <Text>Password</Text>
            <TextInput
              // style={[styles.input, isInvalid && styles.inputInvalid]}
              style={styles.input}
              value={password}
              onChangeText={(enteredText) =>
                // handleChangeInpts("title", enteredText)
                setValues({ ...values, password: enteredText })
              }
              // autoCapitalize={false}
              // autoCapitalize="none"
              // keyboardType={keyboardType}
              // secureTextEntry={secure}
              // onChangeText={onChangeText}
              // value={value}
            />
            <Text>Confirm Password</Text>
            <TextInput
              // style={[styles.input, isInvalid && styles.inputInvalid]}
              style={styles.input}
              value={confirmPassword}
              onChangeText={(enteredText) =>
                // handleChangeInpts("title", enteredText)
                setValues({ ...values, confirmPassword: enteredText })
              }
              // autoCapitalize={false}
              // autoCapitalize="none"
              // keyboardType={keyboardType}
              // secureTextEntry={secure}
              // onChangeText={onChangeText}
              // value={value}
            />
          </View>
          <View style={styles.buttonOuter}>
            <CustomButton onPress={handleSubmit}>Update</CustomButton>
          </View>

          {/* <Button title="Lecturers Login" /> */}
        </View>
        {/* <Button title="Student Login" /> */}
      </View>
    </>
  );
};

export default PasswordUpdateScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: Colors.primary500,
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
  mainContainer: {
    flex: 1,
    padding: 8,
    margin: 8,
  },
  createButtons: {
    // flexDirection: "row",
    gap: 5,
    marginHorizontal: 24,
    marginVertical: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  oneButton: {
    flex: 1,
  },
});
