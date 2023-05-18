import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
} from "react-native";
// import Calendar from "react-native-calendars/src/calendar";
import { Agenda } from "react-native-calendars";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { allLectures } from "../actions/lectureAction";
import { Colors } from "../util/Colors";

const LectureScheduleScreen = ({ route, navigation }) => {
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Lecture Schedule",
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

  // console.log(
  //   "\n",
  //   authCtx.user,
  //   typeof authCtx.user,

  //   authCtx.degree,
  //   authCtx.badge,
  //   authCtx.token,
  //   "\n"
  // );
  //   console.log(typeof authCtx.jUser);
  const [user, setUser] = useState(JSON.parse(authCtx.user));
  // console.log(authCtx.user);
  const [allData, setAllData] = useState();
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const [items, setItems] = useState();
  {
    // "2023-05-16": [
    //   { name: "test 1", cookie: true },
    //   { name: "test 2", cookie: true },
    // ],
    // "2023-05-17": [{ name: "test 3", cookie: true }],
  }

  useEffect(() => {
    if (authCtx.user) {
      setUser(JSON.parse(authCtx.user));
    }
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

  useEffect(() => {
    // handleSubmit();
    fillData();
  }, [allData]);

  //   console.log(authCtx.rawUser.badge, authCtx.rawUser.degree);

  const handleSubmit = async () => {
    // if (e) {
    //   e.preventDefault();
    // }

    setAlert({ ...alert, loading: true });

    let badge;
    let degree;
    let paramsData = {
      badge: badge,
      degree: degree,
      // badge: authCtx.badge,
      // degree: authCtx.degree,
    };

    if (user.role == "student") {
      paramsData.badge = user.badge;
      paramsData.degree = user.degree;
    }
    // let token = getCookie("token_user");
    let token = authCtx.token;

    console.log(paramsData, "\n all lectures from components \n");

    // console.log(params, "submit clicked...");
    await allLectures(paramsData)
      .then((data) => {
        // console.log(data);
        if (data.status && data.status == "success") {
          if (data) {
            // console.log(data);
            setAllData(data);
            // fillData();
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
  const [done, setDone] = useState(false);
  let array = [];
  const fillData = () => {
    if (allData) {
      console.log(allData);
      // console.log(allData, "from fill data \n");
      // allData.doc.map((item) => {
      //   // console.log(item.date, "filldata ...");
      //   // let date = item.date;
      //   // array.push(

      //   setItems({
      //     ...items,
      //     [item.date.split("T")[0]]: [
      //       {
      //         title: item.title,
      //         startTime: item.startTime,
      //         endTime: item.endTime,
      //       },
      //     ],
      //   });

      //   // date: item.date,
      //   // );
      // });
      // console.log(items);
      const reduced = allData.doc.reduce((acc, currentData) => {
        // console.log(currentData);
        const { date, endTime, startTime, title, hall } = currentData;

        acc[date.split("T")[0]] = [
          { title: title, startTime: startTime, endTime: endTime, hall: hall },
        ];
        return acc;
      }, {});

      // console.log(reduced, ".....reduced.........");
      setItems(reduced);
    }
    setDone(true);
    // setItems(array);
    // console.log(items);
  };

  // console.log(items);

  const renderItem = (item) => {
    // console.log(item);
    return (
      <>
        <View style={styles.agendaTile}>
          <Text style={styles.agendaTitle}>{item.title}</Text>
          <Text style={styles.hallTitle}>Lecture Hall - {item.hall}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>Start - {item.startTime}</Text>
            <Text style={styles.time}>End - {item.endTime}</Text>
          </View>
        </View>
      </>
    );
  };

  if (done == false) {
    return <LoadingOverlay message={"Loading..."} />;
  }
  // console.log("--------------------------- \n");
  // console.log(items);
  // console.log("--------------------------- \n");
  return (
    <>
      {/* <ScrollView style={styles.rootContainer}> */}
      {/* <View style={styles.container}>
          <Modal animationType="fade"> */}
      {/* <Calendar
            style={styles.calendar}
            markedDates={{
              "2023-05-20": {
                marked: true,
                selected: true,
                selectedColor: "green",
                selectedTextColor: "black",
              },
            }}
            // markingType="period"
            // markedDates={{
            //   "2023-05-20": {
            //     marked: true,
            //     selected: true,
            //     selectedColor: "red",
            //     selectedTextColor: "black",
            //   },
            //   //   "2023-05-21": {
            //   //     marked: true,
            //   //     selected: true,
            //   //     selectedColor: "green",
            //   //     selectedTextColor: "black",
            //   //   },
            // }}
          /> */}
      {allData && done && (
        <Agenda
          items={items}
          renderItem={renderItem}
          showClosingKnob={true}
          minDate="2023-03-01"
          maxDate="2023-08-30"
        />
      )}
      {/* </Modal>
        </View> */}
      {/* </ScrollView> */}
    </>
  );
};

export default LectureScheduleScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
    // marginTop: 32,
  },
  container: {
    marginTop: 32,
  },
  agendaTile: {
    padding: 10,
    margin: 10,
    backgroundColor: Colors.primary100,
    borderRadius: 24,
    color: "white",
  },
  agendaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    margin: 40,
  },
  hallTitle: {
    fontWeight: "bold",
  },
});
