import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//   import MealDetails from "./MealDetails";

const ModuleItem = ({ module }) => {
  const navigation = useNavigation();

  const selectModuleItemHandler = () => {
    // navigation.navigate("ModuleDetails");
    navigation.navigate("ModuleDetails", {
      moduleId: module._id,
    });
  };

  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectModuleItemHandler}
      >
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/moduleCover.png")}
          />

          {module && <Text style={styles.title}>{module.title}</Text>}
          {/* <MealDetails
              duration={duration}
              affordability={affordability}
              complexity={complexity}
            /> */}
          {/* <View style={styles.details}>
              <Text style={styles.detailItem}>{duration} m</Text>
              <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
              <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
            </View> */}
        </View>
      </Pressable>
    </View>
  );
};

export default ModuleItem;

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    justifyContent: "center",
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
