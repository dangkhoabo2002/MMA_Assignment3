import React from "react";
import {
  Pressable,
  StyleSheet,
  FlatList,
  Image,
  View,
  Text,
} from "react-native";

import ListOfFood from "../data/ListOfFood";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

export default function Home({ navigation: { navigate } }) {
  const [existingFavorites, setExistingFavorites] = useState([]);

  const generateItemId = (name, price) => `${name}-${price}`;

  const fetchExistingFavorites = async () => {
    try {
      const storedItemIds = await AsyncStorage.getItem("favoriteItems");
      if (storedItemIds) {
        const itemIds = JSON.parse(storedItemIds);
        setExistingFavorites(itemIds);
      } else {
        setExistingFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching existing favorites: ", error);
    }
  };
  useEffect(() => {
    fetchExistingFavorites();
  }, []);

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      price={item.price}
      image={item.img}
      info={item.info}
      type={item.type}
      existingFavorites={existingFavorites}
    />
  );

  const updateFavorites = async (updatedFavorites) => {
    setExistingFavorites(updatedFavorites);
    await AsyncStorage.setItem(
      "favoriteItems",
      JSON.stringify(updatedFavorites)
    );
  };

  const Item = ({ name, price, image, existingFavorites, info, type }) => {
    const [isFavorite, setIsFavorite] = useState(
      existingFavorites.includes(generateItemId(name, price))
    );
    const addToFavorites = async (name, price) => {
      try {
        const itemId = generateItemId(name, price);
        const updatedFavorites = [...existingFavorites];

        if (existingFavorites.includes(itemId)) {
          const index = updatedFavorites.indexOf(itemId);
          updatedFavorites.splice(index, 1);
        } else {
          updatedFavorites.push(itemId);
        }

        updateFavorites(updatedFavorites);
        setIsFavorite(updatedFavorites.includes(itemId));
      } catch (error) {
        console.error("Error adding/removing item to/from favorites: ", error);
      }
    };

    return (
      <>
        <Pressable
          style={styles.foodContainer}
          onPress={() =>
            navigate("Detail", {
              name,
              price,
              image,
              info,
              type,
              existingFavorites,
              updateFavorites,
            })
          }
        >
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.foodDetail}>
            <View
              style={{ display: "flex", flexDirection: "row", marginBottom: 6 }}
            >
              <Text style={styles.name}>{name}</Text>

              <Text style={styles.price}>{price}</Text>
            </View>
            <FontAwesome5
              name={isFavorite ? "heartbeat" : "heart"}
              size={22}
              color={isFavorite ? "#f0007c" : "black"}
              onPress={() => addToFavorites(name, price)}
            />
          </View>
        </Pressable>
      </>
    );
  };

  const [data, setData] = useState(ListOfFood);

  const [filteredData, setFilteredData] = useState(data);
  const [filterType, setFilterType] = useState(null); // Thêm state để lưu loại bộ lọc
  const [activeButton, setActiveButton] = useState("All");

  const handleFilter = (type) => {
    if (type === "All") {
      setFilteredData(data);
      setFilterType(null);
      setActiveButton("All");
    } else {
      const filtered = data.filter((item) => item.type === type);
      setFilteredData(filtered);
      setFilterType(type);
      if (type === "Outside") {
        setActiveButton("Outside");
      } else {
        setActiveButton("Inside");
      }
    }
  };

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 40,
        }}
      >
        <Pressable
          title="All"
          onPress={() => handleFilter("All")}
          style={[
            styles.filterButton,
            activeButton === "All" && styles.activeFilterButton,
          ]}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>All</Text>
        </Pressable>
        <Pressable
          title="Filter Outside"
          onPress={() => handleFilter("Outside")}
          style={[
            styles.filterButton,
            activeButton === "Outside" && styles.activeFilterButton,
          ]}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Outside
          </Text>
        </Pressable>
        <Pressable
          title="Filter Inside"
          onPress={() => handleFilter("Inside")}
          style={[
            styles.filterButton,
            activeButton === "Inside" && styles.activeFilterButton,
          ]}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Inside
          </Text>
        </Pressable>
      </View>

      <View style={styles.container}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        ></FlatList>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "gray",
    width: 100,
    padding: 12,
    borderRadius: 12,
  },
  activeFilterButton: {
    backgroundColor: "#f7d0d0",
  },
  innerContainer: { display: "flex", flexDirection: "row" },
  foodContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "thistle",
    marginTop: 18,
  },
  image: {
    width: 100,
    height: 100,
  },
  foodDetail: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
  },
  titleContainer: {},
  name: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  price: { color: "green", fontSize: 20, marginLeft: 20 },
});
