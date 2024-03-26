import { View, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import {
  BackArrow,
  Clock,
  Delete,
  Filter,
  Heart,
  Scan,
  Search as SearchIcon,
} from "../../../../assets/images/svgs";
import { Input, Text } from "../../../../components/general";
import { useState } from "react";
import { Link } from "expo-router";
const laptop = require("../../../../assets/images/pngs/laptop.png");

const recentSearch = [
  {
    title: "Macbook Pro 16 Inch",
  },
  {
    title: "Playstation 5",
  },
  {
    title: "Nike Go FlyEase",
  },
];

const products = [
  {
    title: "Macbook Pro 13 inch with Apple M1 Chip 256GB SSD",
    price: "$1,299.00",
    image: laptop,
  },
  {
    title: "Macbook Pro 13 inch with Apple M1 Chip 256GB SSD",
    price: "$1,299.00",
    image: laptop,
  },
  {
    title: "Macbook Pro 13 inch with Apple M1 Chip 256GB SSD",
    price: "$1,299.00",
    image: laptop,
  },
  {
    title: "Macbook Pro 13 inch with Apple M1 Chip 256GB SSD",
    price: "$1,299.00",
    image: laptop,
  },
  {
    title: "Macbook Pro 13 inch with Apple M1 Chip 256GB SSD",
    price: "$1,299.00",
    image: laptop,
  },
  {
    title: "Macbook Pro 13 inch with Apple M1 Chip 256GB SSD",
    price: "$1,299.00",
    image: laptop,
  },
  {
    title: "Macbook Pro 13 inch with Apple M1 Chip 256GB SSD",
    price: "$1,299.00",
    image: laptop,
  },
  {
    title: "Macbook Pro 13 inch with Apple M1 Chip 256GB SSD",
    price: "$1,299.00",
    image: laptop,
  },
  {
    title: "Macbook Pro 13 inch with Apple M1 Chip 256GB SSD",
    price: "$1,299.00",
    image: laptop,
  },
  {
    title: "Macbook Pro 13 inch with Apple M1 Chip 256GB SSD",
    price: "$1,299.00",
    image: laptop,
  },
];

export default function Search() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable style={[styles.action, styles.actionLeft]}>
          <BackArrow />
        </Pressable>

        <Text
          color="#fff"
          size={16}
          type="heading"
          weight="700"
          letterSpacing={0.4}
          center
        >
          Search
        </Text>

        <Pressable style={[styles.action, styles.actionRight]}>
          <Filter />
        </Pressable>
      </View>

      <View style={styles.inputWrapper}>
        <Input
          placeholder="Search"
          value={search}
          setValue={setSearch}
          iconLeft={<SearchIcon width={20} height={20} />}
          iconRight={
            <Link href={"/main/mainScreens/search/scanItem"}>
              {/* <Scan width={20} height={20} /> */}p
            </Link>
          }
          isTransparent
        />
      </View>

      {/* <View style={styles.searchHeader}>
        <Text
          color="#F8FAFC"
          size={16}
          type="heading"
          weight="700"
          letterSpacing={0.4}
        >
          Recent
        </Text>
        <Text
          color="#64748B"
          size={14}
          type="heading"
          weight="700"
          letterSpacing={0.1}
        >
          Delete
        </Text>
      </View> */}

      <Text
        color="#94A3B8"
        size={14}
        type="heading"
        weight="700"
        letterSpacing={0.1}
        style={{
          marginBottom: 8,
        }}
      >
        Products
      </Text>

      {/* <View>
        {recentSearch.map((search) => (
          <View style={styles.search}>
            <View style={styles.searchMain}>
              <Clock width={20} height={20} />
              <Text
                color="#F8FAFC"
                size={14}
                type="body"
                weight="500"
                letterSpacing={0.1}
              >
                {search.title}
              </Text>
            </View>

            <Pressable style={styles.cancel}>
              <Delete width={20} height={20} />
            </Pressable>
          </View>
        ))}
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {products.map((product, index) => (
          <View style={styles.product} key={index}>
            <View style={styles.productImageWrapper}>
              <Image source={product.image} width={57} />
            </View>

            <View style={styles.productMain}>
              <Text
                color="#F8FAFC"
                size={14}
                type="body"
                weight="500"
                letterSpacing={0.1}
              >
                {product.title}
              </Text>

              <View style={styles.productBottom}>
                <Text
                  color="#F8FAFC"
                  size={14}
                  type="body"
                  weight="700"
                  letterSpacing={0.1}
                >
                  {product.price}
                </Text>

                <Pressable style={styles.wishlist}>
                  <Heart width={20} height={20} />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  action: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },

  actionLeft: {
    paddingRight: 24,
  },

  actionRight: {
    paddingLeft: 24,
  },

  inputWrapper: {
    marginBottom: 24,
  },

  searchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 12,
  },

  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    paddingVertical: 12,
  },

  searchMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  cancel: {
    justifyContent: "center",
    alignItems: "center",
  },

  product: {
    paddingVertical: 14,
    flexDirection: "row",
    gap: 16,
  },

  productImageWrapper: {
    width: 82,
    height: 88,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  productMain: {
    flex: 1,
    gap: 8,
    justifyContent: "space-between",
  },

  productBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },

  wishlist: {
    justifyContent: "center",
    alignItems: "center",
  },
});
