import { ChevronDownIcon, ChevronUpIcon } from "native-base";
import React, { useState, FC, useEffect } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import colors from "~utils/colors";

export type DropdownProps = {
  label?: string;
  placeHolder?: string;
  value?: string;
  viewStyle?: ViewStyle;
  errorMessage?: string;
  onSelectValue?: (value: DropdownItem) => void;
  data?: DropdownItem[];
  disabled?: boolean;
};

export type DropdownItem = {
  label: string;
  value: string;
};

const DropdownView: FC<DropdownProps> = (props) => {
  const {
    label,
    placeHolder,
    value = "",
    viewStyle,
    errorMessage,
    onSelectValue,
    data,
    disabled,
  } = props;

  return (
    <>
      <View style={[styles.rowView, viewStyle]}>
        <View>
          <Dropdown
            style={[
              styles.value,
              {
                marginLeft: -1,
                marginRight: -1,
              },
            ]}
            disable={disabled}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={{
              color: colors.gray4,
            }}
            itemTextStyle={{
              fontFamily: "Montserrat-Regular",
              color: colors.black,
            }}
            itemContainerStyle={{
              borderColor: colors.darkGrey,
              borderBottomWidth: 1,
            }}
            data={data || []}
            dropdownPosition="bottom"
            labelField="label"
            valueField="value"
            placeholder={placeHolder || label}
            value={value}
            onChange={(item: DropdownItem) => {
              onSelectValue?.(item);
            }}
            autoScroll={false}
            renderRightIcon={() => <></>}
          />
        </View>
        <View style={{ right: 25, position: "absolute" }}>
          {
            disabled? 
            <ChevronUpIcon size={30}/> :
            <ChevronDownIcon size={30}/>
          }
          
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    paddingTop: 10,
    marginBottom:10
  },
  rowView: {
    borderRadius: 10,
    borderBottomWidth: 1,
    marginTop: 10,
    paddingTop: 10,
    justifyContent: "center",
    height: 50,
    marginHorizontal: 40,
  },
  title: {
    marginHorizontal: 16,
  },
  value: {
    marginHorizontal: 12,
    marginBottom: 10,
    paddingHorizontal: 17,
    flex: 1,marginVertical:20,paddingBottom:15
  },
  errorText: {
    marginStart: 5,
    marginTop: 5,
  },
  dropdownLabel: {
    marginHorizontal: 16,
  },
  dropdown: {
    borderRadius: 8,
    paddingHorizontal: 17,
    flex: 1,
  },
  selectedTextStyle: {
    marginBottom: 5,
    color: colors.black,
  },
});
export default DropdownView;
