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
const ExamDetailsScreen = () => {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  // const mealId = route.params.mealId;
  // const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  // const mealIsFavoite = favoriteMealsCtx.ids.includes(mealId);
  // const changeFavoriteStatusHandler = () => {
  //   if (mealIsFavoite) {
  //     favoriteMealsCtx.removeFavorite(mealId);
  //   } else {
  //     favoriteMealsCtx.addFavorite(mealId);
  //   }
  // };
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {
  //       return (
  //         <IconButton
  //           icon={mealIsFavoite ? "star" : "star-outline"}
  //           color={"white"}
  //           onPress={changeFavoriteStatusHandler}
  //         />
  //       );
  //     },
  //   });
  // }, [navigation, changeFavoriteStatusHandler]);

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
            <Text style={styles.title}>Module title</Text>
            <View style={styles.tableBar}>
              <Text>Exam/Assignment</Text>
              <Text>Marks</Text>
            </View>
            <View style={styles.oneMaterial}>
              <Text style={styles.materialTitle}>
                Title Of the Exam/Assignment
              </Text>
              <Text style={styles.material}>89</Text>
            </View>
            <Text style={styles.title}>Module title</Text>
            <View style={styles.tableBar}>
              <Text>Exam/Assignment</Text>
              <Text>Marks</Text>
            </View>
            <View style={styles.oneMaterial}>
              <Text style={styles.materialTitle}>
                Title Of the Exam/Assignment
              </Text>
              <Text style={styles.material}>89</Text>
            </View>
            <Text style={styles.title}>Module title</Text>
            <View style={styles.tableBar}>
              <Text>Exam/Assignment</Text>
              <Text>Marks</Text>
            </View>
            <View style={styles.oneMaterial}>
              <Text style={styles.materialTitle}>
                Title Of the Exam/Assignment
              </Text>
              <Text style={styles.material}>89</Text>
            </View>
            <Text style={styles.title}>Module title</Text>
            <View style={styles.tableBar}>
              <Text>Exam/Assignment</Text>
              <Text>Marks</Text>
            </View>
            <View style={styles.oneMaterial}>
              <Text style={styles.materialTitle}>
                Title Of the Exam/Assignment
              </Text>
              <Text style={styles.material}>89</Text>
            </View>

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

export default ExamDetailsScreen;

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
