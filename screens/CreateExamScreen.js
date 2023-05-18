import {
  Text,
  View,
  StyleSheet,
  TextInput,
  DatePickerIOSBase,
  Button,
  Modal,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { Colors } from "../util/Colors";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createExam } from "../actions/examAction";
// import DatePicker from "react-native-datepicker";
// import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

const CreateExamScreen = ({ route, navigation }) => {
  const authCtx = useContext(AuthContext);
  console.log("\n", authCtx.user, "\n from create exam screen");
  const moduleId = route.params.moduleId;

  // console.log(authCtx.token, typeof authCtx.token);

  // const [token, setToken] = useState(authCtx.token);

  const [openTime, setOpenTime] = useState(false);
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    title: "",
    date: "",
    time: "",
    hall: "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create Exam",
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

  // useEffect(() => {
  //   setValues({ ...values, formData: new FormData() });
  // }, []);

  const { title, date, time, hall } = values;

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

  const handleSubmit = async () => {
    console.log("clicked...");
    setAlert({ ...alert, loading: true });
    // console.log(docImage, "submit..");
    let data = {
      title: title,
      date: date,
      time: time,
      hall: hall,
      module: moduleId,
    };

    let token = authCtx.token;
    await createExam(data, token)
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
          setValues({ title: "", date: "", time: "", hall: "" });
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
    return <LoadingOverlay message="Creating Exam..." />;
  }
  if (alert.success) {
    return <LoadingOverlay message={alert.message} />;
  }

  // ------------------------- DATE PICKER -------------------------------------

  const handleOpen = () => {
    setOpen(!open);
  };

  let today = new Date();

  let startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const handleChangeDate = (propDate) => {
    console.log(propDate.split("/"));
    let tempDate = `${propDate.split("/")[0]}-${propDate.split("/")[1]}-${
      propDate.split("/")[2]
    }`;
    setValues({ ...values, date: tempDate });
  };

  console.log(values);

  // ------------------------- DATE PICKER -------------------------------------
  // ------------------------- DATE PICKER -------------------------------------

  const handleOpenTime = () => {
    setOpenTime(!openTime);
  };

  // let today = new Date();

  // let startDate = getFormatedDate(
  //   today.setDate(today.getDate() + 1),
  //   "YYYY/MM/DD"
  // );
  const handleChangeTime = (propDate) => {
    console.log(propDate);
    // let tempDate = `${propDate.split("/")[0]}-${propDate.split("/")[1]}-${
    //   propDate.split("/")[2]
    // }`;
    setValues({ ...values, time: propDate });
    // handleOpenTime();
  };

  console.log(values);

  // ------------------------- DATE PICKER -------------------------------------

  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          <View>
            <Text>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(enteredText) =>
                // handleChangeInpts("title", enteredText)
                setValues({ ...values, title: enteredText })
              }
            />
          </View>
          <View>
            <Text>Date</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={(enteredText) =>
                // handleChangeInpts("title", enteredText)
                setValues({ ...values, date: enteredText })
              }
            />
            <View style={{ marginTop: 10 }}>
              <CustomButton onPress={handleOpen}>Select Date</CustomButton>
            </View>
          </View>
          <View>
            <Text>Time</Text>
            <TextInput
              style={styles.input}
              value={time}
              onChangeText={(enteredText) =>
                // handleChangeInpts("title", enteredText)
                setValues({ ...values, time: enteredText })
              }
            />
            <View style={{ marginTop: 10 }}>
              <CustomButton onPress={handleOpenTime}>Select Time</CustomButton>
            </View>
          </View>
          <View>
            <Text>Hall</Text>
            <TextInput
              style={styles.input}
              value={hall}
              onChangeText={(enteredText) =>
                // handleChangeInpts("title", enteredText)
                setValues({ ...values, hall: enteredText })
              }
            />
          </View>

          <View style={styles.buttonOuter}>
            <CustomButton onPress={handleSubmit}>Create</CustomButton>
          </View>

          <Modal animationType="fade" transparent={true} visible={open}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={date}
                  onDateChange={handleChangeDate}
                />
                <View style={{ marginBottom: 10, marginTop: -20 }}>
                  <CustomButton onPress={handleOpen}>
                    Close Calendar
                  </CustomButton>
                </View>
              </View>
            </View>
          </Modal>
          <Modal animationType="fade" transparent={true} visible={openTime}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="time"
                  // minimumDate={startDate}
                  selected={time}
                  onTimeChange={handleChangeTime}
                />
                <View style={{ marginBottom: 10, marginTop: -20 }}>
                  <CustomButton onPress={handleOpenTime}>
                    Close Time
                  </CustomButton>
                </View>
              </View>
            </View>
          </Modal>

          {/* <Button title="Lecturers Login" /> */}
        </View>
        {/* <Button title="Student Login" /> */}
      </View>
    </>
  );
};

export default CreateExamScreen;

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
  buttonOuter: {
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

// ---------------------------------------------------------------

// import {
//   Text,
//   View,
//   StyleSheet,
//   TextInput,
//   DatePickerIOSBase,
// } from "react-native";
// import CustomButton from "../components/CustomButton";
// import CustomInput from "../components/CustomInput";
// import { Colors } from "../util/Colors";
// import { useState, useEffect, useContext } from "react";
// import LoadingOverlay from "../components/LoadingOverlay";
// import { AuthContext } from "../store/auth-context";
// import { createLecture } from "../actions/lectureAction";
// // import DatePicker from "react-native-datepicker";

// const CreateExamScreen = ({ route }) => {
//   const authCtx = useContext(AuthContext);
//   const moduleId = route.params.moduleId;

//   // console.log(authCtx.token, typeof authCtx.token);

//   // const [token, setToken] = useState(authCtx.token);

//   const [values, setValues] = useState({
//     title: "",
//     badge: "",
//     degree: "",
//     startTime: "",
//     endTime: "",
//     date: "",

//     hall: "",
//   });

//   // useEffect(() => {
//   //   setValues({ ...values, formData: new FormData() });
//   // }, []);

//   const { title, badge, degree, startTime, endTime, date, hall } = values;

//   let docImage;

//   const [alert, setAlert] = useState({
//     message: "",
//     error: false,
//     loading: false,
//     success: false,
//   });

//   const resetAlert = () => {
//     setAlert({ message: "", error: false, loading: false, success: false });
//   };

//   const handleChangeInpts = (name, enteredText) => {
//     setValues({ ...values, name: enteredText });
//   };

//   // const selectDoc = async () => {
//   //   try {
//   //     await DocumentPicker.getDocumentAsync({})
//   //       .then((doc) => {
//   //         console.log(doc, "from inside....");
//   //         // setValues({ ...values, formData: new FormData() });
//   //         console.log(
//   //           doc.file,
//   //           doc.uri,
//   //           "......................................"
//   //         );
//   //         docImage = doc;
//   //         console.log(typeof doc);
//   //         formData.append("material", {
//   //           mimeType: doc.mimeType,
//   //           // uri: doc.uri,
//   //           file: doc.uri,
//   //         });

//   //         // formData.append("material", {
//   //         //   mimeType: doc.mimeType,
//   //         //   uri: doc.uri,
//   //         //   file: doc.file,
//   //         // });
//   //         // console.log(doc.mimeType, doc.uri, doc.file);
//   //       })
//   //       .catch((err) => {
//   //         console.log(err, "async inside...");
//   //       });
//   //     // console.log(doc);

//   //     // setValues({ ...values, formData: new FormData() });

//   //     // formData.append("material", doc);
//   //     // console.log();

//   //     // console.log(
//   //     //   doc.uri,
//   //     //   doc.type, // mime type
//   //     //   doc.name,
//   //     //   doc.size
//   //     // );
//   //   } catch (err) {
//   //     if (DocumentPicker.isCancel(err)) {
//   //       console.log(err);
//   //     } else {
//   //       console.log(err);
//   //     }
//   //   }
//   // };

//   const handleSubmit = async () => {
//     console.log("clicked...");
//     setAlert({ ...alert, loading: true });
//     // console.log(docImage, "submit..");
//     let data = {
//       title: title,
//       badge: badge,
//       degree: degree,
//       date: date,
//       startTime: startTime,
//       endTime: endTime,
//       hall: hall,
//       createdBy: JSON.parse(authCtx.user)._id,
//     };

//     let token = authCtx.token;
//     await createLecture(data, token)
//       .then((data) => {
//         console.log(data);
//         if (data.status && data.status == "success") {
//           if (data) {
//             console.log(data);
//             // setAllData(data);
//             // console.log(data.totalCount);
//             // let totalCount = data.totalCount;
//             // setTotalPages(Math.ceil(totalCount / limit));
//             // setShow(false);
//           }
//           setValues({
//             title: "",
//             date: "",
//             startTime: "",
//             endTime: "",
//             degree: "",
//             badge: "",
//             hall: "",
//           });
//           setAlert({
//             ...alert,
//             loading: false,
//             message: data && data.message,
//             error: false,
//             success: true,
//           });

//           window.setTimeout(() => {
//             resetAlert();
//             // setAlert({ ...alert, success: false, message: "" });
//           }, 1000);
//         }

//         return { data };
//       })
//       .catch((err) => {
//         console.log(err);
//         setValues({ title: "", formData: new FormData() });
//         setAlert({
//           ...alert,
//           loading: false,
//           message: err.message,
//           error: true,
//           success: false,
//         });
//       });
//   };

//   if (alert.loading) {
//     return <LoadingOverlay message="Creating Exam..." />;
//   }
//   if (alert.success) {
//     return <LoadingOverlay message={alert.message} />;
//   }

//   return (
//     <>
//       <View style={styles.mainContainer}>
//         <View>
//           {/* <CustomInput label="Title" />
//           <CustomInput label="date" />
//           <CustomInput label="time" />
//           <CustomInput label="Hall" /> */}
//           {/* <View>
//             <DatePickerIOSBase
//               // style={styles.datePickerStyle}
//               // date={date}
//               mode="date"
//               placeholder="select date"
//               format="DD/MM/YYYY"
//               minDate="01-01-1900"
//               maxDate="01-01-2000"
//               confirmBtnText="Confirm"
//               cancelBtnText="Cancel"
//               // customStyles={{
//               //   dateIcon: {
//               //     position: "absolute",
//               //     right: -5,
//               //     top: 4,
//               //     marginLeft: 0,
//               //   },
//               //   dateInput: {
//               //     borderColor: "gray",
//               //     alignItems: "flex-start",
//               //     borderWidth: 0,
//               //     borderBottomWidth: 1,
//               //   },
//               //   placeholderText: {
//               //     fontSize: 17,
//               //     color: "gray",
//               //   },
//               //   dateText: {
//               //     fontSize: 17,
//               //   },
//               // }}
//               onDateChange={(date) => {
//                 console.log(date);
//               }}
//             />
//           </View> */}
//           <View>
//             <Text>Title</Text>
//             <TextInput
//               style={styles.input}
//               value={title}
//               onChangeText={(enteredText) =>
//                 // handleChangeInpts("title", enteredText)
//                 setValues({ ...values, title: enteredText })
//               }
//             />
//           </View>
//           <View>
//             <Text>Date</Text>
//             <TextInput
//               style={styles.input}
//               value={date}
//               onChangeText={(enteredText) =>
//                 // handleChangeInpts("title", enteredText)
//                 setValues({ ...values, date: enteredText })
//               }
//             />
//           </View>
//           <View>
//             <Text>Start Time</Text>
//             <TextInput
//               style={styles.input}
//               value={startTime}
//               onChangeText={(enteredText) =>
//                 // handleChangeInpts("title", enteredText)
//                 setValues({ ...values, startTime: enteredText })
//               }
//             />
//           </View>
//           <View>
//             <Text>End Time</Text>
//             <TextInput
//               style={styles.input}
//               value={endTime}
//               onChangeText={(enteredText) =>
//                 // handleChangeInpts("title", enteredText)
//                 setValues({ ...values, endTime: enteredText })
//               }
//             />
//           </View>
//           <View>
//             <Text>Degree</Text>
//             <TextInput
//               style={styles.input}
//               value={degree}
//               onChangeText={(enteredText) =>
//                 // handleChangeInpts("title", enteredText)
//                 setValues({ ...values, degree: enteredText })
//               }
//             />
//           </View>
//           <View>
//             <Text>Badge</Text>
//             <TextInput
//               style={styles.input}
//               value={badge}
//               onChangeText={(enteredText) =>
//                 // handleChangeInpts("title", enteredText)
//                 setValues({ ...values, badge: enteredText })
//               }
//             />
//           </View>
//           <View>
//             <Text>Hall</Text>
//             <TextInput
//               style={styles.input}
//               value={hall}
//               onChangeText={(enteredText) =>
//                 // handleChangeInpts("title", enteredText)
//                 setValues({ ...values, hall: enteredText })
//               }
//             />
//           </View>

//           <View style={styles.buttonOuter}>
//             <CustomButton onPress={handleSubmit}>Create</CustomButton>
//           </View>

//           {/* <Button title="Lecturers Login" /> */}
//         </View>
//         {/* <Button title="Student Login" /> */}
//       </View>
//     </>
//   );
// };

// export default CreateExamScreen;

// const styles = StyleSheet.create({
//   inputContainer: {
//     marginVertical: 8,
//   },
//   label: {
//     color: Colors.primary500,
//     marginBottom: 4,
//   },
//   labelInvalid: {
//     color: Colors.error500,
//   },
//   input: {
//     paddingVertical: 8,
//     paddingHorizontal: 6,
//     backgroundColor: Colors.primary100,
//     borderRadius: 4,
//     fontSize: 16,
//   },
//   inputInvalid: {
//     backgroundColor: Colors.error100,
//   },
//   mainContainer: {
//     flex: 1,
//     padding: 8,
//     margin: 8,
//   },
// });
