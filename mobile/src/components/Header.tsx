import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { View, Image, Pressable } from "native-base";
import BackIcon from "~assets/back_arrow.svg";
import InfoIcon from "~assets/info_icon.svg";
interface HeaderProps {
  onBackPress: () => void;
  showInfo?: boolean;
}

export const Header: FC<HeaderProps> = (props) => {
  const { onBackPress, showInfo = false } = props;

  return (
    <View>
      <View style={[styles.view]}>
        <Pressable bgColor={"coolGray.200:alpha.20"} style={styles.iconSize} onPress={onBackPress}>
          <BackIcon style={styles.backIcon} />
        </Pressable>
        {showInfo ? (
          <Pressable style={styles.infoIconSize}>
            <InfoIcon style={styles.infoIcon} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginHorizontal: 20,
    paddingBottom: 10,
    alignContent: "center",
  },

  iconSize: {
    width: 18,
    height: 18,
    position: "absolute",
    left: 0,
    zIndex: 2,
    top: 15,
  },

  infoIconSize: {
    width: 40,
    height: 30,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  infoIcon: { height: 40, width: 50 },
  backIcon: { height: 50, width: 50 },
});
export default Header;
