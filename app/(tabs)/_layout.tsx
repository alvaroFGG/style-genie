// app/(tabs)/_layout.tsx
import { Header, Tabs } from "@/components/core";
import ClosetProvider from "@/providers/ClosetProvider";
import { Slot, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView } from "react-native-tab-view";

type Route = {
  key: string;
  path: string;
};

const SLIDE_DURATION = 120;

export default function TabsLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const layout = useWindowDimensions();

  const routes = [
    { key: "today", path: "/" },
    { key: "closet", path: "/closet" },
  ] as Route[];

  const routeIndex = routes.findIndex((r) => r.path === pathname);

  const [index, setIndex] = useState(routeIndex === -1 ? 0 : routeIndex);
  const [prevIndex, setPrevIndex] = useState(index);

  const handleIndexChange = (newIndex: number) => {
    setPrevIndex(index);
    setIndex(newIndex);
  };

  const isGoingRight = index < prevIndex;

  useEffect(() => {
    if (routeIndex !== -1 && routeIndex !== index) {
      setIndex(routeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (routes[index].path !== pathname) {
      router.replace(routes[index].path as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <SafeAreaView className="h-screen bg-black">
      <StatusBar barStyle="light-content" />

      <Header showAvatar />

      <Tabs index={index} setIndex={setIndex} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) =>
          route.key === routes[index].key ? (
            <Animated.View
              key={pathname} // clave para reiniciar animación al cambiar ruta
              entering={
                isGoingRight
                  ? SlideInLeft.duration(SLIDE_DURATION)
                  : SlideInRight.duration(SLIDE_DURATION)
              }
              exiting={
                isGoingRight
                  ? SlideOutRight.duration(SLIDE_DURATION)
                  : SlideOutLeft.duration(SLIDE_DURATION)
              }
              style={{ flex: 1 }}
            >
              <ClosetProvider>
                <Slot />
              </ClosetProvider>
            </Animated.View>
          ) : null
        }
        renderTabBar={() => null}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        swipeEnabled
        lazy
        lazyPreloadDistance={0}
      />
    </SafeAreaView>
  );
}
