import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, G, Path, Rect, Use } from "react-native-svg";

type FootballPitchProps = {
  backgroundColor: string;
  strokeColor: string;
};

const FootballPitch = ({
  backgroundColor = "green",
  strokeColor = "white",
}: FootballPitchProps) => {
  return (
    <View style={styles.container}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="100%"
        viewBox="0 0 74 111"
        preserveAspectRatio="xMidYMid meet"
      >
        <Rect width="74" height="111" fill={backgroundColor} />
        <G
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.5"
          transform="translate(3 3)"
        >
          <Path id="Border" d="M 0 0 h 68 v 105 h -68 Z" />
          <Path id="Centre line" d="M 0 52.5 h 68" />
          <Circle id="Centre circle" r="9.15" cx="34" cy="52.5" />
          <Circle
            id="Centre mark"
            r="0.75"
            cx="34"
            cy="52.5"
            fill={strokeColor}
            stroke="none"
          />
          <G id="Penalty area">
            <Path id="Penalty area line" d="M 13.84 0 v 16.5 h 40.32 v -16.5" />
            <Path id="Goal area line" d="M 24.84 0 v 5.5 h 18.32 v -5.5" />
            <Circle
              id="Penalty mark"
              r="0.75"
              cx="34"
              cy="10.94"
              fill={strokeColor}
              stroke="none"
            />
            <Path
              id="Penalty arc"
              d="M 26.733027 16.5 a 9.15 9.15 0 0 0 14.533946 0"
            />
          </G>
          <Use href="#Penalty area" transform="rotate(180,34,52.5)" />
          <Path
            id="Corner arcs"
            d="M 0 2 a 2 2 0 0 0 2 -2 M 66 0 a 2 2 0 0 0 2 2 M 68 103 a 2 2 0 0 0 -2 2 M 2 105 a 2 2 0 0 0 -2 -2"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34a853",
  },
});

export default FootballPitch;
