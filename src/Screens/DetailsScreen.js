import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Transition } from "react-navigation-fluid-transitions";

import Dimensions from "../DimensionProvider";
import { isMobile } from "../Utils";

function fadeBottomTransition(transitionInfo) {
  const { progress, start, end } = transitionInfo;
  const translateInterpolation = progress.interpolate({
    inputRange: [0, start, end, 1],
    outputRange: [-100, -100, 0, 0],
  });
  const opacityInterpolation = progress.interpolate({
    inputRange: [0, start, end, 1],
    outputRange: [0, 0, 1, 1],
  });
  return {
    transform: [{ translateY: translateInterpolation }],
    opacity: opacityInterpolation,
  };
}

const constructStyles = (width, height) => ({
  background: {
    position: "absolute",
    top: height * 0.4,
    height: height * 0.6,
    left: 0,
    right: 0,
    backgroundColor: "rgb(245, 240, 239)",
  },
  guitarImg: {
    position: "absolute",
    top: height * 0.1,
    right: isMobile(width) ? -height * 0.13 : width * 0.1,
    height: height * 0.8,
    width: height * 0.26,
  },
  contentContainer: {
    position: "absolute",
    top: isMobile(width) ? -64 : -108,
    paddingTop: height * 0.4,
    paddingBottom: height * 0.1,
    paddingLeft: width * 0.1,
  },
  title: {
    marginBottom: 14,
    fontSize: isMobile(width) ? 36 : 72,
    fontWeight: "bold",
  },
  decalContainer: {
    width: 112,
    height: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  decal: {
    transform: [{ scale: 1 }, { translateY: -1250 }],
  },
  subtitle: {
    fontSize: isMobile(width) ? 20 : 28,
    fontWeight: "bold",
    letterSpacing: 3.22,
    paddingBottom: isMobile(width) ? 10 : 28,
    paddingTop: isMobile(width) ? 10 : 21,
  },
  price: {
    color: "rgb(211, 80, 102)",
    fontSize: isMobile(width) ? 28 : 48,
    fontWeight: "bold",
  },
  description: {
    fontSize: isMobile(width) ? 14 : 17,
    fontWeight: "bold",
    maxWidth: width * (isMobile(width) ? 0.6 : 0.4),
  },
  cartButtonContainer: { alignItems: "flex-start", paddingTop: 30 },
  cartButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "black",
  },
  cartButtonText: {
    fontSize: isMobile(width) ? 14 : 17,
    color: "white",
    fontWeight: "bold",
  },
  closeButton: { position: "absolute", right: 30, top: 30 },
  closeButtonText: { fontSize: 30, fontWeight: "bold" },
});

export default class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const {
      title,
      img,
      subtitle,
      price,
      description,
    } = navigation.state.params;

    return (
      <Dimensions.Consumer>
        {({ width, height }) => {
          const styles = constructStyles(width, height);
          return (
            <View style={StyleSheet.absoluteFill}>
              <ScrollView>
                <Transition shared={`${title}-bg`}>
                  <View style={styles.background} />
                </Transition>
                <Transition shared={`${title}-guitar`}>
                  <Image style={styles.guitarImg} source={img} />
                </Transition>
                <View style={styles.contentContainer}>
                  {/* This is just to make all subsequent transitions slightly more delayed */}
                  <Transition delay={true}>
                    <View />
                  </Transition>
                  <Transition delay={true} appear={fadeBottomTransition}>
                    <Text style={styles.title}>{title}</Text>
                  </Transition>
                  <Transition delay={true} appear={fadeBottomTransition}>
                    <View style={styles.decalContainer}>
                      <Image style={styles.decal} source={img} />
                    </View>
                  </Transition>
                  <Transition delay={true} appear={fadeBottomTransition}>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                  </Transition>
                  <Transition delay={true} appear={fadeBottomTransition}>
                    <Text style={styles.price}>{`\$${price}`}</Text>
                  </Transition>
                  <Transition delay={true} appear={fadeBottomTransition}>
                    <View style={{ paddingTop: isMobile(width) ? 19 : 32 }}>
                      <Text style={styles.description}>{description}</Text>
                    </View>
                  </Transition>
                  <Transition delay={true} appear={fadeBottomTransition}>
                    <View style={styles.cartButtonContainer}>
                      <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => {
                          /* No-Op */
                        }}
                      >
                        <Text style={styles.cartButtonText}>
                          {"Add to cart"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Transition>
                </View>
              </ScrollView>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Dimensions.Consumer>
    );
  }
}
