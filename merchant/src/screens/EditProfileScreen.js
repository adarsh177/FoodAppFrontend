import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CreateProfile, GetProfile, UpdateProfile} from '../APIs/ProfileManager';
import auth from '@react-native-firebase/auth';
import RNLocation from 'react-native-location';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Geolocation from 'react-native-geolocation-service';
import ReverseGeocode from '../APIs/ReverseGeocoding';

function EditProfileScreen(props) {
  const [phone, setPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({});
  const [locationPoint, setLocationPoint] = useState({});
  const [banner, setBanner] = useState(null);
  const [paymentAccountComplete, setPaymentAccountComplete] = useState(false);

  const [dataLoading, setDataLoading] = useState(true);
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const reference = storage().ref(`/MerchantBanner/${auth().currentUser.uid}`);

  useEffect(() => {
    setPhone(auth().currentUser.phoneNumber);

    GetProfile()
      .then(profile => {
        setDataLoading(false);
        if (profile == null) return;

        setStoreName(profile.name);
        setDescription(profile.description);
        setLocation(profile.location);
        setLocationPoint(profile.locationPoint);
        setBanner(profile.bannerImage);
        setPaymentAccountComplete(profile.paymentAccountComplete ?? false);
      })
      .catch(err => {
        console.log('Erro get profile', err);
      });
  }, []);

  const selectImage = () => {
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

        setImageLoading(true);
        reference
          .putFile(source)
          .then(
            async snap => {
              console.log('Upload success', snap.state);
              const url = await reference.getDownloadURL();
              console.log('Downloadable url', url);
              setBanner(url);
            },
            error => {
              console.log('Error uploading pic', error);
              alert(`Error Updating Picture : ${error.nativeErrorMessage}`);
            },
          )
          .finally(() => setImageLoading(false));
      }
    });
  };

  const selectLocation = async () => {
    RNLocation.configure({
      distanceFilter: 0.5,
    });

    RNLocation.requestPermission({
      android: {
        detail: 'fine',
      },
      ios: 'whenInUse',
    })
      .then(granted => {
        console.log('Permission', granted);
        if (!granted) {
          Alert.alert('Location', 'Please grant location permission', [
            {
              text: 'Grant',
              style: 'default',
              onPress: () => selectLocation(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
          return;
        }
        setLocationLoading(true);
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocationPoint({
              type: 'Point',
              coordinates: [
                position.coords.longitude,
                position.coords.latitude,
              ],
            });
            ReverseGeocode(position.coords.latitude, position.coords.longitude)
              .then(location => {
                if (['India', 'Canada'].includes(location.country)) {
                  // only allowing india and canada as of now
                  setLocation(loc => ({
                    ...location,
                    label: loc.label ? loc.label : location.label,
                  }));
                } else {
                  Alert.alert(
                    'Restricted Location',
                    'We are currently only operating in India and Canada.',
                  );
                }
              })
              .catch(err => {
                console.log('Error getting rev geocode', err);
                alert('Error getting location, please try again');
              })
              .finally(() => setLocationLoading(false));
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocationLoading(false);
            alert('Error getting location, please try again');
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      })
      .catch(err => {
        console.log('Error getting location permission', err);
        alert('Error getting location');
      });
  };

  const updateProfile = async () => {
    if (dataLoading || imageLoading || profileUpdateLoading) return;

    console.log('UID:', auth().currentUser.uid);
    if (!storeName || storeName.length < 3) {
      Alert.alert('Error', 'Please enter a valid store name');
      return;
    }
    if (!description || description.length < 3) {
      Alert.alert('Error', 'Please enter a valid store description');
      return;
    }
    if (!storeName || storeName.length < 3) {
      Alert.alert('Error', 'Please enter a valid store name');
      return;
    }
    if (!banner) {
      Alert.alert('Error', 'Please upload an image');
      return;
    }
    if (!locationPoint || Object.keys(locationPoint).length < 2) {
      Alert.alert('Error', 'Please select a location');
      return;
    }

    setProfileUpdateLoading(true);
    if (props.route && props.route.params && props.route.params.forced) {
      CreateProfile({
        name: storeName,
        description: description,
        location: location,
        locationPoint: locationPoint,
        bannerImage: banner,
      })
        .then(() => {
          Alert.alert('Success', 'Profile Updated Successfully', [
            {
              text: 'Ok',
              onPress: () => props.navigation.navigate('home'),
            },
          ]);
        })
        .catch(err => {
          Alert.alert('Error', 'Error updating profile');
        })
        .finally(() => setProfileUpdateLoading(false));
    } else {
      UpdateProfile({
        name: storeName,
        description: description,
        location: location,
        locationPoint: locationPoint,
        bannerImage: banner,
      })
        .then(() => {
          Alert.alert('Success', 'Profile Updated Successfully', [
            {
              text: 'Ok',
              onPress: () => props.navigation.pop(),
            },
          ]);
        })
        .catch(err => {
          Alert.alert('Error', 'Error updating profile');
        })
        .finally(() => setProfileUpdateLoading(false));
    }
  };

  if (dataLoading)
    return <ActivityIndicator color={AppConfig.primaryColor} size="large" />;

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <ImageBackground
        imageStyle={{resizeMode: 'stretch'}}
        source={require('../assets/bg_repeat.png')}
        style={Style.mainContainer}>
        <View style={Style.ImageContainer}>
          <Image
            style={Style.Image}
            source={{
              uri: banner
                ? banner
                : 'https://media.istockphoto.com/photos/top-view-table-full-of-food-picture-id1220017909?b=1&k=6&m=1220017909&s=170667a&w=0&h=yqVHUpGRq-vldcbdMjSbaDV9j52Vq8AaGUNpYBGklXs=',
            }}
          />
          {imageLoading ? (
            <ActivityIndicator
              style={{position: 'absolute', right: 10, bottom: 10}}
              size="small"
              color={AppConfig.primaryColor}
            />
          ) : (
            <TouchableOpacity
              style={Style.ChangeImage}
              activeOpacity={0.8}
              onPress={selectImage}>
              <Text style={Style.ChangeImageLabel}>Change</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={Style.Label}>Phone Number</Text>
        <TextInput
          editable={false}
          style={[Style.Field, {borderColor: '#9c9c9c', color: '#9c9c9c'}]}
          value={phone}
        />

        <Text style={Style.Label}>Store Name</Text>
        <TextInput
          style={Style.Field}
          value={storeName}
          onChangeText={setStoreName}
        />

        <Text style={Style.Label}>Description</Text>
        <TextInput
          style={[Style.Field, {textAlignVertical: 'top'}]}
          numberOfLines={3}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={Style.Label}>Landmark</Text>
        <TextInput
          style={[Style.Field, {textAlignVertical: 'top'}]}
          value={location.label}
          onChangeText={val =>
            setLocation(loc => ({
              ...loc,
              label: val,
            }))
          }
        />

        <Text style={Style.Label}>Location</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => selectLocation()}>
          <View style={[Style.Field, Style.LocationField]}>
            <Text
              numberOfLines={1}
              style={{fontSize: 16, flex: 1, marginRight: 10}}>
              {!locationLoading
                ? location.city
                  ? `${location.city}, ${location.state}, ${location.country}`
                  : 'Fetch Location'
                : 'Fetching location....'}
            </Text>
            {!paymentAccountComplete && (
              <Icon name="target" color={AppConfig.primaryColor} size={22} />
            )}
          </View>
        </TouchableOpacity>

        {profileUpdateLoading ? (
          <ActivityIndicator
            style={{alignSelf: 'center'}}
            color={AppConfig.primaryColor}
            size="large"
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{width: '100%', marginTop: 20}}
            onPress={updateProfile}>
            <Text style={Style.SaveBtn}>SAVE</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </ScrollView>
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: "#fff",
    padding: 10,
  },
  ImageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 1,
    borderColor: '#efefef',
    borderWidth: 1,
    marginBottom: 20,
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 3,
  },
  ChangeImage: {
    position: 'absolute',
    bottom: 10,
    end: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: AppConfig.primaryColor,
    borderRadius: 3,
    elevation: 1,
  },
  ChangeImageLabel: {
    width: '100%',
    height: '100%',
    color: '#fff',
    fontWeight: 'bold',
  },
  Label: {
    fontSize: 14,
    color: '#5C5C5C',
    marginBottom: 5,
  },
  Field: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    borderColor: AppConfig.primaryColor,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  LocationField: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    paddingEnd: 10,
  },
  SaveBtn: {
    width: '100%',
    paddingVertical: 10,
    color: '#fff',
    backgroundColor: AppConfig.primaryColor,
    borderRadius: 3,
    elevation: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
