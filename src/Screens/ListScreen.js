import * as React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Transition } from "react-navigation-fluid-transitions";
import { withNavigation } from "react-navigation";

import Dimensions from "../DimensionProvider";
import { isMobile } from "../Utils";
import guitarData from "../GuitarData";

const Link = ({ url, children }) => (
  <Text
    onPress={() => Linking.openURL(url)}
    style={{ color: "rgb(211, 80, 102)" }}
  >
    {children}
  </Text>
);

const constructGuitarItemStyles = (width, height, index) => ({
  container: {
    paddingHorizontal: width * 0.04,
    marginTop: index % 2 === 0 ? -128 : 0,
    marginBottom: height * 0.12,
    width: width * 0.5,
  },
  contentContainer: { marginTop: isMobile(width) ? 220 : 160 },
  background: {
    height: isMobile(width) ? 160 : 320,
    position: "relative",
    backgroundColor: "rgb(245, 240, 239)",
  },
  guitarImageContainer: {
    top: isMobile(width) ? -260 : -160,
    alignItems: "center",
  },
  guitarImage: {
    width: 130.77,
    height: 400,
  },
  title: {
    fontSize: isMobile(width) ? 20 : 28,
    fontWeight: "bold",
  },
  subtitle: {
    color: "rgb(160, 152, 151)",
    fontSize: isMobile(width) ? 12 : 13.6,
    fontWeight: "700",
    letterSpacing: 1.564,
  },
});

const GuitarItem = ({
  title,
  subtitle,
  price,
  img,
  description,
  navigation,
  index,
}) => (
  <Dimensions.Consumer>
    {({ width, height }) => {
      const styles = constructGuitarItemStyles(width, height, index);
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", {
              title,
              subtitle,
              price,
              img,
              description,
            })
          }
          style={styles.container}
        >
          <View style={styles.contentContainer}>
            <Transition shared={`${title}-bg`}>
              <View style={styles.background} />
            </Transition>
            <View
              style={[StyleSheet.absoluteFill, styles.guitarImageContainer]}
            >
              <Transition shared={`${title}-guitar`}>
                <Image style={styles.guitarImage} source={img} />
              </Transition>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </TouchableOpacity>
      );
    }}
  </Dimensions.Consumer>
);

export default class ListScreen extends React.Component {
  state = { focused: true };

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView scrollEnabled={navigation.isFocused()}>
        <View style={listStyles.container}>
          <Text style={listStyles.appTitle}>Expanding Grid Item Animation</Text>
          <Text style={listStyles.appSubtitle}>
            <Link url="https://tympanus.net/Development/ExpandingGridItemAnimation/">
              Codrop's vanilla JS implementation
            </Link>
            {" rewritten in "}
            <Link url="https://github.com/vincentriemer/react-native-dom">
              React Native DOM
            </Link>
            {" with "}
            <Link url="https://github.com/fram-x/FluidTransitions">
              react-navigation-fluid-transitions
            </Link>
          </Text>
        </View>
        <View style={listStyles.gridContainer}>
          {guitarData.map((data, i) => (
            <GuitarItem
              key={data.title}
              navigation={navigation}
              index={i}
              {...data}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const listStyles = StyleSheet.create({
  container: { padding: 32, alignItems: "center" },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    paddingVertical: 24,
    textAlign: "center",
  },
  appSubtitle: {
    textAlign: "center",
    paddingHorizontal: 40,
  },
  gridContainer: {
    paddingTop: 192,
    paddingBottom: 128,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
