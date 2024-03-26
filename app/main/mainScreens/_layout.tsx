import { Tabs } from "expo-router";
import {
  Home,
  Search,
  Heart,
  Bag,
  Profile,
  HomeActive,
  SearchActive,
  ProfileActive,
  HeartActive,
  BagActive,
} from "../../../assets/images/svgs";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";

export default function MainScreensLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F172A",
          borderTopWidth: 0,
          // elevation: 8,
          // shadowColor: "#64748B05",
          shadowColor: "#64748b",
          shadowOffset: {
            width: 24,
            height: -8,
          },
          shadowOpacity: 0.02,
          shadowRadius: 20.0,
          elevation: 24,
          paddingVertical: 0,

          // box-shadow: 0px -8px 24px 0px #64748B05;
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          lineHeight: 16,
          letterSpacing: 0.2,
        },

        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#64748B",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeActive width={24} height={24} />
            ) : (
              <Home width={24} height={24} />
            ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SearchActive width={24} height={24} />
            ) : (
              <Search width={24} height={24} />
            ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          tabBarLabel: "Wishlist",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HeartActive width={24} height={24} />
            ) : (
              <Heart width={24} height={24} />
            ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          tabBarLabel: "Bag",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <BagActive width={24} height={24} />
              ) : (
                <Bag width={24} height={24} />
              )}

              <View style={styles.itemsWrapper}>
                <Text style={styles.items}>3</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ProfileActive width={24} height={24} />
            ) : (
              <Profile width={24} height={24} />
            ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  itemsWrapper: {
    position: "absolute",
    right: -4,
    top: 0,
    backgroundColor: "#FF4747",
    borderRadius: 1000,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#0F172A",
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  items: {
    fontSize: 7,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 8.82,
    textAlign: "center",
  },
});
