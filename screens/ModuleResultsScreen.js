import { Text, Image, View, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../util/Colors";
// import { MEALS } from "../data/dummy-data";
// import MealDetails from "../components/MealDetails";
// import Subtitle from "../components/MealDetail/Subtitle";
// import List from "../components/MealDetail/List";
// import { useLayoutEffect, useContext } from "react";
// import { Button } from "react-native";
// import IconButton from "../components/IconButton";
// import { FavoritesContext } from "../store/context/favourite-context";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { AuthContext } from "../store/auth-context";
import { allResults } from "../actions/resultActions";
const ModuleResultsScreen = ({ route, navigation }) => {
  const authCtx = useContext(AuthContext);

  const moduleId = route.params.moduleId;
  const moduleTitle = route.params.moduleTitle;
  console.log("details screen...");
  console.log(moduleId);

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
      title: "Exams Results",
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

  let userRole;
  useEffect(() => {
    if (authCtx.user) {
      userRole = JSON.parse(authCtx.user).role;
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

  const handleSubmit = async () => {
    // if (e) {
    //   e.preventDefault();
    // }
    setAlert({ ...alert, loading: true });
    let paramsData = {
      student: JSON.parse(authCtx.user)._id,
      module: moduleId,
    };
    console.log(paramsData);
    // let token = getCookie("token_user");

    // console.log(params, "submit clicked...");
    await allResults(paramsData)
      .then((data) => {
        // console.log(data);
        if (data.status && data.status == "success") {
          if (data) {
            console.log(data);
            setAllData(data);
            console.log(allData);
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

  const createLectureMaterialScreen = () => {
    // navigation.navigate("CreateLectureMaterial");
    navigation.navigate("CreateLectureMaterial", {
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

  return (
    <>
      <ScrollView style={styles.rootContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/examCover.png")}
        />

        {/* <MealDetails
          duration={selectedMeal.duration}
          affordability={selectedMeal.affordability}
          complexity={selectedMeal.complexity}
          textStyle={styles.detailText}
        /> */}
        <View style={styles.listOuterContainer}>
          <View style={styles.listContainer}>
            <Text style={styles.title}>{moduleTitle}</Text>
            <View style={styles.tableBar}>
              <Text>Exam/Assignment</Text>
              <Text>Marks</Text>
            </View>
            {allData &&
              allData.doc.map((item, index) => {
                // console.log(item.exam, "exammmmmmmmmmmmmmm\n");
                return (
                  <>
                    <View key={index} style={styles.oneMaterial}>
                      <Text style={styles.materialTitle}>
                        {item.exam[0].title}
                      </Text>
                      <Text style={styles.material}>{item.marks}</Text>
                    </View>
                  </>
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
      </ScrollView>
    </>
  );
};

export default ModuleResultsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 300,
  },
  //   imageContainer: {
  //     flex: 1,
  //     // width: "100%",
  //   },
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
    flex: 1,
    width: "90%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  oneMaterial: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.primary100,
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  materialTitle: {
    // fontWeight: "bold",
    fontSize: 14,
    backgroundColor: Colors.primary500,
    padding: 4,
    borderRadius: 12,
    marginBottom: 2,
  },
  material: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: Colors.primary800,
    padding: 4,
    borderRadius: 12,
  },
  tableBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    margin: 4,
    borderColor: Colors.primary500,
    borderWidth: 2,
    borderRadius: 6,
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
