import { Header, Tabs } from "@/components/core";
import { useState } from "react";
import { SafeAreaView, StatusBar, useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import ClosetScreen from "./closet";
import DayOutfitScreen from "./day-outfit";

const HomeScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "today", title: "Today" },
    { key: "closet", title: "Closet" },
  ]);

  const renderScene = SceneMap({
    today: DayOutfitScreen,
    closet: ClosetScreen,
  });

  return (
    <SafeAreaView className="bg-black flex-1">
      <StatusBar barStyle="light-content" />
      <Header />

      {/* Pasa el índice al componente Tabs */}
      <Tabs index={index} setIndex={setIndex} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={() => null}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
