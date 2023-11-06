// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   StyleSheet,
//   FlatList,
//   Image,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { AsyncStorage } from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons";
// import ListOfFood from "../data/ListOfFood";

// export default function Favorite({ navigation: { navigate } }) {
//   const [data, setData] = useState(ListOfFood);

//   const renderItem = ({ item }) => (
//     <Item
//       name={item.name}
//       price={item.price}
//       image={item.img}
//       info={item.info}
//       id={item.id}
//     />
//   );
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleItemClick = (id) => {
//     setSelectedItem(id);
//     console.log(`You clicked on ${id}`);
//     setIsFavorite(!isFavorite);
//   };
//   const Item = ({ name, price, image, info, id }) => (
//     <>
//       <Pressable
//         style={styles.foodContainer}
//         onPress={() => navigate("Detail", { name, price, image, info })}
//         onLongPress={() => handleItemClick(id)}
//       >
//         <Image style={styles.image} source={{ uri: image }} />
//         <View style={styles.foodDetail}>
//           <View
//             style={{ display: "flex", flexDirection: "row", marginBottom: 6 }}
//           >
//             <Text style={styles.name}>{name}</Text>

//             <Text style={styles.price}>{price}</Text>
//           </View>
//           <FontAwesome5
//             name={isFavorite ? "heart" : "heartbeat"}
//             size={24}
//             color={isFavorite ? "black" : "#ff00ae"}
//           />
//         </View>
//       </Pressable>
//     </>
//   );

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListOfFood from "../data/ListOfFood";
export default function Favorite({navigation}) {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const storedItemIds = await AsyncStorage.getItem("favoriteItems");
        if (storedItemIds) {
          const itemIds = JSON.parse(storedItemIds);
          const items = ListOfFood.filter((item) =>
            itemIds.includes(generateItemId(item.name, item.price))
          );
          setFavoriteItems(items);
        }
      } catch (error) {
        console.error("Error retrieving favorite items: ", error);
      }
    };

    fetchFavoriteItems();
  }, [favoriteItems]);

  const generateItemId = (name, price) => `${name}-${price}`;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Favorite</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={favoriteItems}
            keyExtractor={(item) =>
              generateItemId(item.name, item.price, item.image)
            }
            renderItem={({ item }) => (
              <Pressable onPress={() => {}}>
                <View style={styles.foodContainer}>
                  <Text style={styles.name}> {item.name}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                  <Image source={{ uri: item.image }} />
                </View>
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 40,
    paddingBottom: 15,
    paddingLeft: 18,
    fontSize: 20,
    fontWeight: "500",
    backgroundColor: "#FBDABB",
  },
  listContainer: {
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
