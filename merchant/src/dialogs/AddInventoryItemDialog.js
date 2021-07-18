import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppConfig from '../../AppConfig.json';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { AddCommodity } from '../APIs/StoreManager';

function AddInventoryItemDialog(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const reference = storage().ref(`/CommodityImage/${auth().currentUser.uid}/${new Date().getTime()}`);

  const close = () => {
    setName('');
    setDescription('');
    setImageUrl(null);

    props.close();
  }

  const addClicked = async () => {
    if(imageUrl == null){
      alert('Please select an image');
      return;
    }
    if(name.length == 0){
      alert('Please enter item name');
      return;
    }
    if(description.length == 0){
      alert('Please enter item description');
      return;
    }

    AddCommodity({
      name: name,
      description: description,
      image: imageUrl
    }).then(() => {
      alert('Item added successfully');
      close();
    }).catch(err => {
      console.log("Error adding item", err);
      alert('Error adding item');
    })
  }

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      mediaType: "photo"
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Error', 'No Image selected');
      } else if (response.error) {
        Alert.alert('Error', 'ImagePicker Error: ', response.error);
      } else {
        let source = response.assets[0].uri;

        console.log(response.assets[0]);
        
        reference.putFile(source).then(
          async (snap) => {
            console.log('Upload success', snap.state);
            const url = await reference.getDownloadURL();
            console.log('Downloadable url', url);
            setImageUrl(url);
          }, (error) => {
            console.log('Error uploading pic', error);
            alert(`Error Updating Picture : ${error.nativeErrorMessage}`);
          },
        );
      }
    })
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        close();
      }}>
      <View style={style.mainContainer}>
        <View style={style.inventoryModalContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={style.getImageButton}
            onPress={() => selectImage()}>
            {imageUrl ? <Image source={{uri: imageUrl}} style={style.addImageContainer} /> : 
              <View style={style.addImageContainer}>
                <Icon name="plus" size={24} color={AppConfig.primaryColor} />
                <Text style={style.selectImageText}>Select Image</Text>
              </View>
            }
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
          <TouchableOpacity
            activeOpacity={0.6}
            style={style.addItem}
            onPress={() => addClicked()}>
            <Text style={style.addItemButtonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
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
    height: 250,
    width: '90%',
    flexDirection: 'row',
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
    justifyContent: 'space-between',
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
    width: '73%',
  },
  modalTextInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 5,
    marginBottom: 20,
    padding: 5,
  },
  addItem: {
    position: 'absolute',
    width: '112.3%',
    height: 50,
    bottom: 0,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addItemButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddInventoryItemDialog;
