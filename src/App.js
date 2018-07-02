import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";
import { createFluidNavigator } from "react-navigation-fluid-transitions";

import Dimensions from "./DimensionProvider";
import ListScreen from "./Screens/ListScreen";
import DetailsScreen from "./Screens/DetailsScreen";

const transitionConfig = {
  timing: Animated.spring,
  speed: 7,
  bounciness: 1,
  useNativeDriver: true,
};

const App = createFluidNavigator(
  {
    List: { screen: ListScreen },
    Details: {
      screen: DetailsScreen,
      navigationOptions: { gesturesEnabled: true },
    },
  },
  { transitionConfig }
);

export default () => (
  <Dimensions.Provider>
    <App />
  </Dimensions.Provider>
);
