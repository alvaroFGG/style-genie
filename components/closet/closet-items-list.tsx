import { ClosetItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  closetItems: ClosetItem[];
}

export const ClosetItemsList = ({ closetItems }: Props) => {
  return (
    <View className="flex-1 mt-5">
      <ScrollView>
        {closetItems.map((item) => (
          <Image
            key={item.id}
            source={{ uri: item.image_url }}
            style={styles.image}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="camera" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  fab: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 40,
    right: 30,
    height: 70,
    backgroundColor: "white",
    borderRadius: 100,
  },
});
