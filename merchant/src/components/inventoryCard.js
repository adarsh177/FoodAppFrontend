import React from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

function InventoryCard(props) {
  // Image source
  const imageSource = '../assets/restaurant.jpg';

  return (
    <View style={style.InventoryCardInnerContainer}>
      <Image style={style.InventoryCardImage} source={{uri: props.image}} />
      <View style={style.cardDetailsContainer}>
        <Text style={style.itemName}>{props.itemName}</Text>
        <Text style={style.itemDescription}>{props.description}</Text>
        <Text style={style.itemDescription}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>Ingredients: </Text>
           {props.ingredients ? props.ingredients.join(', ') : "None"}
        </Text>
        <Text style={style.itemDescription}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>Tags: </Text>
          {props.tags ? props.tags.join(', ') : "None"}
        </Text>
        <TouchableOpacity activeOpacity={0.6} onPress={props.handelDelete}>
          <Text style={style.deleteItem}>Delete Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  InventoryCardInnerContainer: {
    width: '100%',
    borderRadius: 3,
    borderWidth: 0.5,
    borderEndWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginVertical: 5,
  },
  InventoryCardImage: {
    width: 120,
    height: "100%",
    resizeMode: 'cover',
    borderRadius: 3,
  },
  cardDetailsContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5
  },
  itemDescription: {
    fontSize: 14,
    color: '#707070',
    marginBottom: 5,
  },
  deleteItem: {
    color: '#FF5353',
    fontSize: 13,
    fontWeight: '700',
    alignSelf: 'flex-end'
  },
});
export default InventoryCard;
