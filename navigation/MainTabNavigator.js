import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import COLORS from "../commons/constants/COLORS";
import CalendarScreen from "../screens/CalendarScreen";
import TaskListScreen from "../screens/TaskListScreen";
import TimelineScreen from "../screens/TimelineScreen";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: COLORS.ivory },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarActiveTintColor: "tomato",
          headerShown: false,
          tabBarIcon: () => <Icon name="calendar" size={23} color="black" />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="tasks" size={23} color="black" />,
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          headerShown: false,
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
