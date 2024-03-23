import { Tabs } from "expo-router";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="/main/home"
        options={{
          tabBarLabel: "Home",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="/main/search"
        options={{
          tabBarLabel: "Search",
        }}
      />
      <Tabs.Screen
        name="/main/wishlist"
        options={{
          tabBarLabel: "Wishlist",
        }}
      />
      <Tabs.Screen
        name="/main/bag"
        options={{
          tabBarLabel: "Bag",
        }}
      />
      <Tabs.Screen
        name="/main/profile"
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
