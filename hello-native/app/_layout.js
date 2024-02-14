import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Slot, usePathname, Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    padding: 20,
    // marginTop: 55,
    backgroundColor: "slateblue",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  logo: {
    fontSize: 20,
    color: "white",
    marginRight: 20,
  },
});

export default function App() {
  const pathName = usePathname();

  return (
    <View>
      <View style={styles.header}>
        {pathName === "/" ? (
          <FontAwesome style={styles.logo} name="list" />
        ) : (
          <Link href="/" style={styles.logo}>
            <FontAwesome style={{ fontSize: 20 }} name="arrow-left" />
          </Link>
        )}
        <Text style={styles.title}>To do</Text>
      </View>
      <Slot />
      <StatusBar style="light" />
    </View>
  );
}
