import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppConfig from '../../AppConfig.json';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {AddCommodity} from '../APIs/StoreManager';
import SelectMultiple from 'react-native-select-multiple';
import {GetIngredientsAndTags} from '../APIs/IngredientsManager';

function AddInventoryItemDialog(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const reference = storage().ref(
    `/CommodityImage/${auth().currentUser.uid}/${new Date().getTime()}`,
  );

  const close = () => {
    setName('');
    setDescription('');
    setImageUrl(null);

    props.close();
  };

  const addClicked = async () => {
    if (loading || imageUploadLoading) return;

    if (imageUrl == null) {
      alert('Please select an image');
      return;
    }
    if (name.length == 0) {
      alert('Please enter item name');
      return;
    }
    if (description.length == 0) {
      alert('Please enter item description');
      return;
    }

    setLoading(true);
    AddCommodity({
      name: name,
      description: description,
      image: imageUrl,
      tags: selectedTags.map(val => val.value),
      ingredients: selectedIngredients.map(val => val.value),
    })
      .then(() => {
        alert('Item added successfully');
        close();
      })
      .catch(err => {
        console.log('Error adding item', err);
        alert('Error adding item');
      })
      .finally(() => setLoading(false));
  };

  const selectImage = () => {
    if (imageUploadLoading) return;

    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('Error', 'No Image selected');
      } else if (response.error) {
        Alert.alert('Error', 'ImagePicker Error: ', response.error);
      } else {
        let source = response.assets[0].uri;

        console.log(response.assets[0]);

        setImageUploadLoading(true);
        setImageUrl(null);
        reference
          .putFile(source)
          .then(
            async snap => {
              console.log('Upload success', snap.state);
              const url = await reference.getDownloadURL();
              console.log('Downloadable url', url);
              setImageUrl(url);
            },
            error => {
              console.log('Error uploading pic', error);
              alert(`Error Updating Picture : ${error.nativeErrorMessage}`);
            },
          )
          .finally(() => setImageUploadLoading(false));
      }
    });
  };

  useEffect(() => {
    GetIngredientsAndTags()
      .then(val => {
        console.log('int', val);
        setIngredients(val.ingredients);
        setTags(val.tags);
      })
      .catch(err => {
        console.log('err in ingredients', err);
      });
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        close();
      }}>
      <View style={style.mainContainer}>
        <ScrollView
          style={style.inventoryModalContainer}
          contentContainerStyle={{justifyContent: 'flex-start'}}>
          <Text style={[style.headingText, {marginTop: 0, marginBottom: 10}]}>
            Item Information
          </Text>
          <View style={style.horizontalContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={style.getImageButton}
              onPress={() => selectImage()}>
              {imageUrl ? (
                <Image
                  source={{uri: imageUrl}}
                  style={style.addImageContainer}
                />
              ) : (
                <View style={style.addImageContainer}>
                  {imageUploadLoading ? (
                    <ActivityIndicator
                      size="large"
                      color={AppConfig.primaryColor}
                    />
                  ) : (
                    <>
                      <Icon
                        name="plus"
                        size={24}
                        color={AppConfig.primaryColor}
                      />
                      <Text style={style.selectImageText}>Select Image</Text>
                    </>
                  )}
                </View>
              )}
            </TouchableOpacity>

            <View style={style.modalTextInputContainer}>
              <TextInput
                placeholder="Item Name (max 70 characters)"
                style={style.modalTextInput}
                maxLength={70}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                placeholder="Enter description (max 120 characters)"
                style={style.modalTextInput}
                multiline
                numberOfLines={4}
                maxLength={120}
                onChangeText={setDescription}
                value={description}
              />
            </View>
          </View>

          <Text style={style.headingText}>Select Ingredients (Optional)</Text>
          <SelectMultiple
            items={ingredients}
            renderLabel={(label, style) => <Text style={style}>{label}</Text>}
            selectedItems={selectedIngredients}
            flatListProps={{
              numColumns: 3,
            }}
            onSelectionsChange={setSelectedIngredients}
          />

          <Text style={style.headingText}>Tags (Optional)</Text>
          <SelectMultiple
            items={tags}
            renderLabel={(label, style) => <Text style={style}>{label}</Text>}
            selectedItems={selectedTags}
            flatListProps={{
              numColumns: 3,
            }}
            onSelectionsChange={setSelectedTags}
          />

          <TouchableOpacity
            activeOpacity={0.6}
            style={style.addItem}
            onPress={() => addClicked()}>
            {loading ? (
              <ActivityIndicator color="#FFF" size="large" />
            ) : (
              <Text style={style.addItemButtonText}>Add Item</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              style.addItem,
              {
                backgroundColor: null,
                borderColor: 'red',
                borderWidth: 1,
                marginTop: 10,
                marginBottom: 50,
              },
            ]}
            onPress={() => close()}>
            <Text
              style={[
                style.addItemButtonText,
                {color: 'red', fontWeight: 'normal'},
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    ...StyleSheet.absoluteFill,
  },
  //Modal styling ------------------------------
  inventoryModalContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 0.5,
    borderEndWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 50,
    padding: 20,
  },
  horizontalContainer: {
    marginRight: 20,
    flexDirection: 'row',
  },
  addImageContainer: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  selectImageText: {
    fontSize: 10,
    marginTop: 10,
    marginBottom: -10,
    color: '#a4a4a4',
  },
  modalTextInputContainer: {
    width: '100%',
  },
  modalTextInput: {
    width: '75%',
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 5,
  },
  addItem: {
    width: '100%',
    height: 50,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 40,
  },
  addItemButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppConfig.primaryColor,
    marginTop: 20,
    marginBottom: 5,
  },
});

export default AddInventoryItemDialog;
