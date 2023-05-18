import "react-native-gesture-handler";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "./components/IconButton";
import AppLoading from "expo-app-loading";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { Ionicons } from "@expo/vector-icons";
import LoadingOverlay from "./components/LoadingOverlay";
import { Colors } from "./util/Colors";

import WelcomeScreen from "./screens/WelcomeScreen";
import LogInScreen from "./screens/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ModuleDetailsScreen from "./screens/ModuleDetailsScreen";
import ExamDetails from "./screens/ExamDetailsScreen";
import CreateLectureMaterial from "./screens/CreateLectureMaterialScreen";
import CreateLectureMaterialScreen from "./screens/CreateLectureMaterialScreen";
import ExamDetailsScreen from "./screens/ExamDetailsScreen";
import CreateExamScreen from "./screens/CreateExamScreen";
import LectureScheduleScreen from "./screens/LectureScheduleScreen";
import CreateLectureScreen from "./screens/CreateLectureScreen";
import ModuleResultsScreen from "./screens/ModuleResultsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PasswordUpdateScreen from "./screens/PasswordUpdateScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 },
        headerTintColor: "white",
        sceneContentStyle: { backgroundColor: Colors.primary500 },
        drawerContentStyle: { backgroundColor: "white" },
        drawerInactiveTintColor: Colors.primary500,
        drawerActiveTintColor: Colors.primary800,
        drawerActiveBackgroundColor: Colors.primary100,
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={WelcomeScreen}
        options={{
          title: "All Modules",
          drawerIcon: ({ color, size }) => (
            // <Text>Icon</Text>
            <Ionicons name="list" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />

      {/* <Drawer.Screen
        name="Exam Results"
        component={ExamDetailsScreen}
        options={{
          title: "Exam Results",
          drawerIcon: ({ color, size }) => (
            <Text>Icon</Text>
            // <Ionicons name="list" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Lecture Schedule"
        component={LectureScheduleScreen}
        options={{
          title: "Lecture Schedule",
          drawerIcon: ({ color, size }) => (
            // <Text>Icon</Text>
            <Ionicons name="calendar" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            // <Text>Icon</Text>
            <Ionicons name="person" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />

      {/* <Drawer.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          // title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        // contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={DrawerNavigator}
        options={{
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ModuleDetails"
        component={ModuleDetailsScreen}
        options={{
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateLectureMaterial"
        component={CreateLectureMaterialScreen}
        options={{
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateExam"
        component={CreateExamScreen}
        options={{
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateLecture"
        component={CreateLectureScreen}
        options={{
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="ModuleResults"
        component={ModuleResultsScreen}
        options={{
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordUpdate"
        component={PasswordUpdateScreen}
        options={{
          headerRight: ({ tintColor }) => (
            // <Text>IconButton</Text>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          // headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              // onPress={authCtx.logout}
            />
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* {true && <AuthStack />}
      {false && <AuthenticatedStack />} */}
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};
function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");
      const storedDegree = await AsyncStorage.getItem("degree");
      const storedBadge = await AsyncStorage.getItem("badge");

      if (storedToken) {
        authCtx.authenticate(
          storedToken,
          storedUser,
          storedDegree,
          storedBadge
        );

        // authCtx.jauth(storedUser);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay message={"Loading.."} />;
    // return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
