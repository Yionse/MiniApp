import { View, Text } from "@tarojs/components";
import { Button, Checkbox, Input } from "@taroify/core";
import "./index.less";
import { useState } from "react";

export default function Index() {
  return (
    <View className="container">
      <Header />
      <Context />
    </View>
  );
}

function Header() {
  const [value, setValue] = useState<string>("");
  return (
    <View className="header">
      <Input
        value={value}
        onChange={(e) => setValue(e.detail.value)}
        style={{
          width: "60%",
          height: "100rpx",
          paddingLeft: "30rpx",
          borderBottom: "1px solid #dcdee0",
          color: "white",
        }}
      />
      <Button
        variant="outlined"
        style={{ width: "30%", height: "100rpx", color: "white" }}
      >
        Submit
      </Button>
    </View>
  );
}

function Context() {
  return (
    <View className="content">
      <Text>Context</Text>
      <Item />
    </View>
  );
}

function Item() {
  return (
    <View
      style={{
        boxSizing: "border-box",
        borderLeft: "10px solid skyblue",
        height: "70rpx",
        lineHeight: "70rpx",
        paddingLeft: "20rpx",
      }}
    >
      <Checkbox style={{ margin: "0 10rpx" }} className="active" />
      1111
    </View>
  );
}
