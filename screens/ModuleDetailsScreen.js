import {
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { Colors } from "../util/Colors";
import CustomButton from "../components/CustomButton";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { oneModule } from "../actions/moduleAction";
import { AuthContext } from "../store/auth-context";
import fileDownload from "js-file-download";
import * as FileSystem from "expo-file-system";
import { A } from "@expo/html-elements";
import LoadingOverlay from "../components/LoadingOverlay";
// import DownloadFile from "../components/DownloadFile";
// import { MEALS } from "../data/dummy-data";
// import MealDetails from "../components/MealDetails";
// import Subtitle from "../components/MealDetail/Subtitle";
// import List from "../components/MealDetail/List";
// import { useLayoutEffect, useContext } from "react";
// import { Button } from "react-native";
// import IconButton from "../components/IconButton";
// import { FavoritesContext } from "../store/context/favourite-context";
import axios from "axios";
import { deleteMaterial } from "../actions/materialAction";

const ModuleDetailScreen = ({ route, navigation }) => {
  const authCtx = useContext(AuthContext);

  const moduleId = route.params.moduleId;
  // console.log("details screen...");
  // console.log(moduleId);

  // const [user, setUser] = useState(JSON.parse(authCtx.user));
  // console.log(authCtx.user);
  const [allData, setAllData] = useState();
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Module Details",
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

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };
  const [userRole, setUserRole] = useState();
  useEffect(() => {
    if (authCtx.user) {
      setUserRole(JSON.parse(authCtx.user).role);
    }
    // setUser(JSON.parse(authCtx.user));
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

  // const downloadFile = async (fileName) => {
  //   let API = "https://student-portal-mobile-app.onrender.com/api/v1";

  //   await axios(`${API}/file/${fileName}`,{

  //   });
  // FileSystem.downloadAsync(
  //   url
  //   // "http://techslides.com/demos/sample-videos/small.mp4",
  //   // FileSystem.documentDirectory + "small.mp4"
  // )
  //   .then(({ uri }) => {
  //     console.log("Finished downloading to ", uri);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // };

  const downloadFile = async (fileName) => {
    let API = "https://student-portal-mobile-app.onrender.com/api/v1";
    // console.log(paramsData, "\n all lectures \n");
    let url = `${API}/materials/downloadMaterial/${fileName}`;

    const result = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + fileName
      // "http://techslides.com/demos/sample-videos/small.mp4",
      // FileSystem.documentDirectory + "small.mp4"
    );
    // .then(({ uri }) => {
    //   console.log("Finished downloading to ", uri);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    console.log(result.uri);

    fileDownload(result, fileName);

    // save(result.uri);
    // return axios(url, {
    //   method: "GET",
    //   responseType: "blob",
    //   // params: {
    //   //   badge: paramsData.badge,
    //   //   degree: paramsData.degree,
    //   // },
    //   // headers: {
    //   //   Accept: "application/json",
    //   //   "Content-Type": "application/json",
    //   //   //   Authorization: `Bearer ${token}`,
    //   // },
    //   // body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     // console.log(response.data);
    //     fileDownload(response.data, fileName);
    //     return response.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return err;
    //   });
  };

  const handleSubmit = async () => {
    // if (e) {
    //   e.preventDefault();
    // }
    setAlert({ ...alert, loading: true, message: "Loading..." });
    // let paramsData = {
    //   badge: user.badge,
    //   degree: user.degree,
    // };
    // let token = getCookie("token_user");

    // console.log(params, "submit clicked...");
    await oneModule(moduleId)
      .then((data) => {
        // console.log(data);
        if (data.status && data.status == "success") {
          if (data) {
            // console.log(data.doc.title);
            setAllData(data);
            // console.log(allData);
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
  const handleDelete = async (id) => {
    // if (e) {
    //   e.preventDefault();
    // }
    setAlert({ ...alert, loading: true, message: "deleting...." });
    // let paramsData = {
    //   badge: user.badge,
    //   degree: user.degree,
    // };
    // let token = getCookie("token_user");

    // console.log(params, "submit clicked...");
    let token = authCtx.token;
    await deleteMaterial(id, token)
      .then((data) => {
        // handleSubmit();
        // refreshScreen();
        // console.log(data);
        if (data.status && data.status == "success") {
          navigation.navigate("Welcome");
          if (data) {
            console.log(data);
            setAllData(data);
            // console.log(allData);
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
            // resetAlert();
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
  const createLectureMaterialScreen = () => {
    navigation.navigate("CreateLectureMaterial", {
      moduleId: moduleId,
    });
    // navigation.navigate("WelcomeScreen");
  };
  const refreshScreen = () => {
    // navigation.navigate("CreateLectureMaterial");

    navigation.navigate("ModuleDetails", {
      moduleId: moduleId,
    });
  };

  const createLectureScreen = () => {
    // navigation.navigate("CreateLectureMaterial");
    navigation.navigate("CreateLecture");
  };
  const createExamScreen = () => {
    // navigation.navigate("CreateExam");
    navigation.navigate("CreateExam", {
      moduleId: moduleId,
    });
  };
  const moduleResultsScreen = () => {
    // navigation.navigate("CreateExam");
    navigation.navigate("ModuleResults", {
      moduleId: moduleId,
      moduleTitle: allData.doc.title,
    });
  };

  if (alert.loading) {
    return <LoadingOverlay message={alert.message} />;
  }

  return (
    <>
      <ScrollView style={styles.rootContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/moduleCover.png")}
        />
        {/* <DownloadFile /> */}
        {allData && <Text style={styles.title}>{allData.doc.title}</Text>}

        {/* <MealDetails
          duration={selectedMeal.duration}
          affordability={selectedMeal.affordability}
          complexity={selectedMeal.complexity}
          textStyle={styles.detailText}
        /> */}
        <View style={styles.listOuterContainer}>
          <View style={styles.listContainer}>
            {allData &&
              allData.doc.materials.map((material, index) => {
                return (
                  <View style={styles.oneMaterial} key={index}>
                    {material.title && (
                      <Text style={styles.materialTitle}>{material.title}</Text>
                    )}
                    {/* <Text
                      style={styles.material}
                      onPress={() => downloadFile(material.material)}
                    >
                      {material.material}
                    </Text> */}
                    {material.title && (
                      <View>
                        <A
                          href={`https://student-portal-mobile-app.onrender.com/api/v1/materials/downloadMaterial/${material.material}`}
                          download={material.material}
                          style={styles.download}
                        >
                          Download
                        </A>
                        {userRole != "student" && (
                          <Text
                            style={styles.deleteBtn}
                            onPress={() => handleDelete(material._id)}
                          >
                            Delete
                          </Text>
                        )}
                      </View>
                    )}

                    {/* <Text
                      style={styles.material}
                      onPress={() => downloadFile(material.material)}
                    >
                      {material.material}
                    </Text> */}
                  </View>
                );
              })}

            {/* <View>
              <Text>Title Of the lecture Material</Text>
              <Text>Lecture Material</Text>
            </View> */}
            {/* <Subtitle>Ingredients</Subtitle> */}
            {/* <List data={selectedMeal.ingredients} /> */}

            {/* <Subtitle>Steps</Subtitle> */}
            {/* <List data={selectedMeal.steps} /> */}
          </View>
        </View>
        {console.log(
          "\n ",
          JSON.parse(authCtx.user).role,
          userRole,
          "userrole  \n"
        )}

        {userRole != "student" && (
          <View style={styles.createButtons}>
            <View style={styles.oneButton}>
              <CustomButton onPress={createLectureMaterialScreen}>
                Create Lecture Material
              </CustomButton>
            </View>
            <View style={styles.oneButton}>
              <CustomButton onPress={createExamScreen}>
                Create Exam
              </CustomButton>
            </View>
            <View style={styles.oneButton}>
              <CustomButton onPress={createLectureScreen}>
                Create Lecture
              </CustomButton>
            </View>
          </View>
        )}
        {userRole == "student" && (
          <View style={styles.createButtons}>
            <View style={styles.oneButton}>
              <CustomButton onPress={moduleResultsScreen}>
                Exam Results
              </CustomButton>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default ModuleDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    // color: "white",
  },
  detailText: {
    color: "black",
  },
  listContainer: {
    width: "90%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  oneMaterial: {
    backgroundColor: Colors.primary100,
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  download: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 2,
    paddingHorizontal: 2,
    backgroundColor: Colors.primary800,
    borderRadius: 10,
    // width: 100,
    // marginHorizontal: "auto",
  },
  deleteBtn: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 2,
    marginTop: 5,
    paddingTop: 2,
    paddingHorizontal: 2,
    backgroundColor: "#f05146",
    borderRadius: 10,
  },
  materialTitle: {
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: Colors.primary500,
    padding: 4,
    borderRadius: 12,
    marginBottom: 2,
  },
  material: {
    fontSize: 14,
    backgroundColor: Colors.primary800,
    padding: 4,
    borderRadius: 12,
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
  //   subtitle: {
  //     color: "#e2b497",
  //     fontSize: 18,
  //     fontWeight: "bold",

  //     textAlign: "center",
  //   },
  //   subtitleContainer: {
  //     marginHorizontal: 34,
  //     marginVertical: 4,
  //     padding: 6,
  //     borderBottomColor: "#e2b497",
  //     borderBottomWidth: 2,
  //   },
});
