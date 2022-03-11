import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import COLORS from "../commons/constants/COLORS";
import CalendarScreen from "../screens/Calendar/CalendarScreen";
import TaskListScreen from "../screens/Task/TaskListScreen";
import TimelineScreen from "../screens/Timeline/TimelineScreen";
import ModifyTaskScreen from "../screens/Task/ModifyTaskScreen";
import CreateTaskScreen from "../screens/Task/CreateTaskScreen";
import MemoDetailScreen from "../screens/Memo/MemoDetailScreen";
import TaskDetailScreen from "../screens/Task/TaskDetailScreen";
import ModifyMemoScreen from "../screens/Memo/ModifyMemoScreen";
import OptionScreen from "../screens/Option/OptionScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.lightgray,
          height: "8%",
        },
        tabBarHideOnKeyboard: true,
        headerTitleAlign: "center",
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: COLORS.blue,
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="calendar" size={23} color={COLORS.navy} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => <Icon name="tasks" size={23} color="black" />,
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              size={23}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="option"
        component={OptionScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => <Ionicons name="options" size={23} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}
export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ headerShown: false, headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="NewTask"
        component={CreateTaskScreen}
        options={{
          headerTitle: "New Task",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen
        name="ModifyTask"
        component={ModifyTaskScreen}
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ModifyMemo"
        component={ModifyMemoScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen name="Memo Detail" component={MemoDetailScreen} />
    </Stack.Navigator>
  );
}
