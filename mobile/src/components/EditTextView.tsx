import React, { FC, useEffect, useState } from "react";
import { StyleSheet, TextInput, ViewStyle, KeyboardTypeOptions } from "react-native";
import { View, Text, Input } from "native-base";

export interface EditTextViewProps {
  placeHolder?: string | undefined;
  value?: string;
  viewStyle?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  helperText?: string;
  errorMessage?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  multiline?: boolean;
  textAlignVertical?: "auto" | "top" | "center" | "bottom";
  isPlaceholder?: boolean;
}

export const EditTextView: FC<EditTextViewProps> = (props) => {
  const {
    value = "",
    viewStyle,
    keyboardType,
    errorMessage,
    onChangeText,
    onFocus,
    onBlur,
    disabled,
    textAlignVertical,
    multiline,
    helperText,
    isPlaceholder = false,
    placeHolder,
  } = props;

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    setIsError((errorMessage && errorMessage.length !== 0) || false);
  }, [errorMessage]);

  useEffect(() => {
    setIsEmpty(value.length === 0);
  }, [value]);

  return (
    <>
      <View
        style={[styles.view, viewStyle]}
        borderBottomWidth={"1"}
        borderBottomColor={"muted.900"}
        // borderColor={'muted.500'}
        bgColor={disabled ? "muted.400" : undefined}
      >
        <Input
          autoCorrect={false}
          value={value}
          multiline={multiline}
          borderWidth={"0"}
          bgColor={"muted.50"}
          isFocused={true}
          textAlignVertical={textAlignVertical || "auto"}
          editable={!disabled}
          placeholder={placeHolder}
          variant="Unstyled"
          placeholderTextColor={"muted.700"}
          underlineColorAndroid="transparent"
          // style={[
          //   styles.value
          // ]}
          color={"muted.900"}
          onFocus={() => {
            onFocus?.();
            setIsError(false);
            setIsFocus(true);
          }}
          onBlur={() => {
            onBlur?.();
            setIsFocus(false);
          }}
          keyboardType={keyboardType}
          onChangeText={(text) => {
            setIsEmpty(text.length === 0);
            onChangeText?.(text);
          }}
        />
      </View>
      {isError && (
        <Text style={[styles.errorText]} color={"error.800"} fontSize="md" textAlign={"center"}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 10,
    marginTop: 15,
  },
  value: {
    marginHorizontal: 20,
    flex: 1,
  },
  errorText: {
    marginStart: 5,
    marginTop: 5,
  },
});
export default { EditTextView };
