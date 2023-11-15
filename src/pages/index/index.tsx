import taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Checkbox, Input, Button } from "@taroify/core";
import "./index.less";
import { useState, useEffect } from "react";

export type ContextProps = {
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        isFinish: boolean;
        text: string;
      }[]
    >
  >;
  items: {
    id: number;
    isFinish: boolean;
    text: string;
  }[];
};

export default function Index() {
  const storageData = JSON.parse(taro.getStorageSync("TODO_LIST") || "[]");
  const [items, setItems] = useState<
    {
      id: number;
      isFinish: boolean;
      text: string;
    }[]
  >(storageData);
  useEffect(() => {
    taro.setStorageSync("TODO_LIST", JSON.stringify(items));
  }, [items]);
  return (
    <View className="container">
      <Header setItems={setItems} items={items} />
      <Context setItems={setItems} items={items} />
    </View>
  );
}

function Header({ setItems, items }: ContextProps) {
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
        onClick={() => {
          if (!value) return;
          setItems([
            ...items,
            {
              id: +new Date(),
              isFinish: false,
              text: value,
            },
          ]);
          setValue("");
        }}
      >
        Submit
      </Button>
    </View>
  );
}

function Title({ text, count }: { text: string; count: number }) {
  return (
    <View
      style={{
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        height: "100rpx",
        lineHeight: "100rpx",
        padding: "0 20rpx",
        borderBottom: "2px solid white",
        marginBottom: "20rpx",
      }}
    >
      <Text
        style={{
          margin: "10rpx 0",
          fontSize: "60rpx",
          color: "white",
        }}
      >
        {text}
      </Text>
      <Text
        style={{
          background: "#87ceeb",
          borderRadius: "50%",
          height: "50rpx",
          lineHeight: "50rpx",
          marginTop: "15rpx",
          padding: "10rpx 20rpx",
          color: "white",
        }}
      >
        {count}
      </Text>
    </View>
  );
}

function Context({ items, setItems }: ContextProps) {
  const unStart = items.filter((item) => !item.isFinish);
  const finish = items.filter((item) => item.isFinish);

  const changeStatus = (id: number) => {
    const currentItem = items.find((item) => item.id === id) as any;
    const item = items.filter((item) => item.id !== id);
    item.push({ ...currentItem, isFinish: !currentItem?.isFinish });
    setItems(item);
  };

  return (
    <View className="content">
      <Title text="UnFinished" count={unStart.length} />
      {unStart.map(({ id, isFinish, text }) => (
        <Item
          key={id}
          isFinish={isFinish}
          text={text}
          changeStatus={changeStatus}
          id={id}
        />
      ))}
      <Title text="Finished" count={finish.length} />
      {finish.map(({ id, isFinish, text }) => (
        <Item
          key={id}
          isFinish={isFinish}
          text={text}
          changeStatus={changeStatus}
          id={id}
        />
      ))}
    </View>
  );
}

function Item({
  isFinish,
  text,
  id,
  changeStatus,
}: {
  isFinish: boolean;
  text: string;
  id: number;
  changeStatus: (id: number) => void;
}) {
  return (
    <View
      style={{
        display: "flex",
        boxSizing: "border-box",
        borderLeft: "6px solid skyblue",
        paddingLeft: "20rpx",
        margin: "30rpx 0",
        justifyContent: "flex-start",
      }}
    >
      <View style={{ width: "10%", textAlign: "center", position: "relative" }}>
        <Checkbox
          className="active"
          checked={isFinish}
          onClick={() => changeStatus(id)}
        />
      </View>
      <View
        style={{
          width: "90%",
          color: "white",
          textDecoration: `${isFinish ? "line-through" : ""}`,
          lineHeight: "40rpx",
          opacity: `${isFinish ? 0.3 : 1}`,
        }}
      >
        {text}
      </View>
    </View>
  );
}
