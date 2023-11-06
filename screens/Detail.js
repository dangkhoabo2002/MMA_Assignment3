// import { View, Text, StyleSheet, Image, Pressable } from "react-native";
// import React, { useState } from "react";
// import { FontAwesome5 } from "@expo/vector-icons";

// export default function Detail({ route, navigation }) {
//   const { name, price, image, info } = route.params;
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleFavoritePress = () => {
//     setIsFavorite(!isFavorite);
//   };
//   return (
//     <View style={styles.foodCard}>
//       <Text style={styles.title}>{name}</Text>
//       <Image style={styles.image} source={{ uri: image }} />
//       <Text style={styles.info}>{info}</Text>
//       <View style={styles.footer}>
//         <Text style={styles.price}>{price}</Text>
//         <Pressable style={styles.price} onPress={handleFavoritePress}>
//           <FontAwesome5
//             name={isFavorite ? "heart" : "heartbeat"}
//             size={24}
//             color={isFavorite ? "black" : "#ff00ae"}
//           />
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   foodCard: {
//     marginTop: 70,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     borderRadius: 20,
//     width: 320,
//     overflow: "hidden",
//     alignSelf: "center",
//     backgroundColor: "white",
//     shadowColor: "#000000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.19,
//     shadowRadius: 5.62,
//     elevation: 6,
//   },
//   image: {
//     width: "100%",
//     height: 250,
//   },
//   title: {
//     fontSize: 34,
//     fontWeight: "bold",
//     padding: 12,
//   },
//   info: { padding: 12 },
//   price: {
//     color: "red",
//     fontSize: 20,
//     paddingBottom: 22,
//     padding: 12,
//   },
//   footer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
// });
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, React } from "react";
export default function Detail({ route }) {
  const { name, price, image, info, existingFavorites, updateFavorites } =
    route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused, existingFavorites]);
  const generateItemId = (name, price) => `${name}-${price}`;

  const [isFavorite, setIsFavorite] = useState(
    existingFavorites.includes(generateItemId(name, price))
  );

  const addToFavorites = () => {
    const itemId = generateItemId(name, price);
    const updatedFavorites = [...existingFavorites];

    if (!existingFavorites.includes(itemId)) {
      updatedFavorites.push(itemId);
    } else {
      const index = updatedFavorites.indexOf(itemId);
      updatedFavorites.splice(index, 1);
    }

    updateFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.foodCard}>
      <Text style={styles.title}>{name}</Text>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.info}>{info}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{price}</Text>
        <Pressable style={styles.price} onPress={addToFavorites}>
          <FontAwesome5
            name={isFavorite ? "heartbeat" : "heart"}
            size={24}
            color={isFavorite ? "#f0007c" : "black"}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  foodCard: {
    marginTop: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 20,
    width: 320,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    padding: 12,
  },
  info: { padding: 12 },
  price: {
    color: "red",
    fontSize: 20,
    paddingBottom: 22,
    padding: 12,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
