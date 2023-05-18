import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { Colors } from "../util/Colors";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
// import DocumentPicker from "react-native-document-picker";
import * as DocumentPicker from "expo-document-picker";
import { createMaterial, createMaterialFile } from "../actions/materialAction";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/LoadingOverlay";

const CreateLectureMaterialScreen = ({ route, navigation }) => {
  const authCtx = useContext(AuthContext);
  const moduleId = route.params.moduleId;

  // console.log(authCtx.token, typeof authCtx.token);

  // const [token, setToken] = useState(authCtx.token);

  const [values, setValues] = useState({
    title: "",
    file: "",
    material: "",
    formData: "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create Lecture Material",
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

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const { title, file, formData, material } = values;

  let docImage;

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
    setValues({ ...values, name: enteredText });
  };

  const selectDoc = async () => {
    try {
      await DocumentPicker.getDocumentAsync({
        // presentationStyle: "fullScreen",
        // type: [DocumentPicker.types.allFiles],
      })
        .then((doc) => {
          console.log(doc.file, "from inside....");
          // setValues({ ...values, formData: new FormData() });
          console.log(doc, "......................................");
          docImage = doc;
          console.log(typeof doc);
          // formData.append("material", doc);
          formData.append(
            "material",
            JSON.stringify({
              uri: doc.uri,
              file: doc.uri,
              mimeType: doc.mimeType,
              name: doc.name,
              size: doc.size,

              // fileName:doc.file
            })
          );

          // formData.append("material", {
          //   mimeType: doc.mimeType,
          //   uri: doc.uri,
          //   file: doc.file,
          // });
          // console.log(doc.mimeType, doc.uri, doc.file);
        })
        .catch((err) => {
          console.log(err, "async inside...");
        });
      // console.log(doc);

      // setValues({ ...values, formData: new FormData() });

      // formData.append("material", doc);
      // console.log();

      // console.log(
      //   doc.uri,
      //   doc.type, // mime type
      //   doc.name,
      //   doc.size
      // );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };
  // const selectDoc = async () => {
  //   try {
  //     await DocumentPicker.getDocumentAsync({})
  //       .then((doc) => {
  //         console.log(doc, "from inside....");
  //         // setValues({ ...values, formData: new FormData() });
  //         console.log(
  //           doc.file,
  //           doc.uri,
  //           "......................................"
  //         );
  //         docImage = doc;
  //         console.log(typeof doc);
  //         formData.append("material", {
  //           mimeType: doc.mimeType,
  //           // uri: doc.uri,
  //           file: doc.uri,
  //         });

  //         // formData.append("material", {
  //         //   mimeType: doc.mimeType,
  //         //   uri: doc.uri,
  //         //   file: doc.file,
  //         // });
  //         // console.log(doc.mimeType, doc.uri, doc.file);
  //       })
  //       .catch((err) => {
  //         console.log(err, "async inside...");
  //       });
  //     // console.log(doc);

  //     // setValues({ ...values, formData: new FormData() });

  //     // formData.append("material", doc);
  //     // console.log();

  //     // console.log(
  //     //   doc.uri,
  //     //   doc.type, // mime type
  //     //   doc.name,
  //     //   doc.size
  //     // );
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log(err);
  //     } else {
  //       console.log(err);
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    console.log("clicked...");
    setAlert({ ...alert, loading: true });
    // console.log(docImage, "submit..");
    let data = { title: title, material: material, module: moduleId };
    // let data = { title: title };
    for (const key in data) {
      console.log(key, data[key]);
      formData.append(key, data[key]);
      // setValues({ ...values, formData });
      // console.log(`${key}: ${phone[key]}`);
    }

    console.log(typeof values.formData);

    let token = authCtx.token;
    // await createMaterialFile(values.formData, token)
    await createMaterial(data, token)
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
          setValues({ title: "", material: "", formData: new FormData() });
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
    return <LoadingOverlay message="Logging you in..." />;
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
            <Text>Title</Text>
            <TextInput
              // style={[styles.input, isInvalid && styles.inputInvalid]}
              style={styles.input}
              value={title}
              onChangeText={(enteredText) =>
                // handleChangeInpts("title", enteredText)
                setValues({ ...values, title: enteredText })
              }
              // autoCapitalize={false}
              // autoCapitalize="none"
              // keyboardType={keyboardType}
              // secureTextEntry={secure}
              // onChangeText={onChangeText}
              // value={value}
            />
            <Text>Material</Text>
            <TextInput
              // style={[styles.input, isInvalid && styles.inputInvalid]}
              style={styles.input}
              value={material}
              onChangeText={(enteredText) =>
                // handleChangeInpts("title", enteredText)
                setValues({ ...values, material: enteredText })
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
            <CustomButton onPress={handleSubmit}>Create</CustomButton>
          </View>

          {/* <Button title="Lecturers Login" /> */}
        </View>
        {/* <Button title="Student Login" /> */}
      </View>
    </>
  );
};

export default CreateLectureMaterialScreen;

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
});
