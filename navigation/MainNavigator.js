import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import COLORS from "../commons/constants/COLORS";
import CalendarScreen from "../screens/CalendarScreen";
import TaskListScreen from "../screens/TaskListScreen";
import TimelineScreen from "../screens/TimelineScreen";
import ModifyTaskScreen from "../screens/ModifyTaskScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.ivory,
          height: "8%",
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarActiveBackgroundColor: COLORS.green,
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: () => <Icon name="calendar" size={23} color="black" />,
          headerTitle: "Calendar",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{
          headerTitle: "Tasks",
          headerTitleAlign: "center",
          tabBarIcon: () => <Icon name="tasks" size={23} color="black" />,
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          headerTitle: "Timeline",
          headerTitleAlign: "center",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              size={23}
              color="black"
            />
          ),
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewTask"
        component={CreateTaskScreen}
        options={{
          headerTitle: "New Task",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ModifyTask"
        component={ModifyTaskScreen}
        options={{
          headerTitle: "Modify Task",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
