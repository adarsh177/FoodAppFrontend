import React, {useState} from 'react'
import {
  Switch,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import AppConfig from '../../../../AppConfig.json'
import IconMI from 'react-native-vector-icons/MaterialIcons'
import RNLocation from 'react-native-location'
import Geolocation from 'react-native-geolocation-service'
import RestaurantCard from '../../../components/RestaurantCard'
import ReverseGeocode from '../../../APIs/ReverseGeocoding'
import { GetProfile, UpdateProfile } from '../../../APIs/ProfileManager'
import { SearchNearMe } from '../../../APIs/SearchManager'
import NoResult from '../../../assets/no_restro.png'

function Explore(props) {
  const [location, setLocation] = useState({})
  const [locationPoint, setLocationPoint] = useState({})
  const [restros, setRestros] = useState([])
  const [loadingResults, setLoadingResults] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  const handelCardPress = (restroId) => {
    props.navigation.push('restaurantMenu', {merchantId: restroId})
  }

  const handleProfile = () => {
    props.navigation.push('userProfile')
  }

  const GetTrimmedLocation = (locationText) => {
    return locationText ? locationText.split(',')[0] : 'Fetching Location';
  }

  const loadSearchResults = () => {
    setLoadingResults(true)
    SearchNearMe(0).then(val => {
      console.log('SEARCH', val);
      setRestros(val.data)
      setCurrentPage(parseInt(val.page))
    })
    .catch(err => console.log('error searching', err))
    .finally(() => setLoadingResults(false))
  }

  const loadMoreResults = () => {
    setLoadingResults(true)
    SearchNearMe(currentPage + 1).then(val => {
      console.log('SEARCH', val)
      if(val.data.length > 0){
        setRestros([...restros, val.data])
        setCurrentPage(parseInt(val.page))
      }
    })
    .catch(err => console.log('error searching', err))
    .finally(() => setLoadingResults(false))
  }

  //handle User Location ------------------------------------
  const handleUserLocation = async () => {
      setLocation({})
      
      RNLocation.configure({
          distanceFilter: 0.5,
      })
      
      RNLocation.requestPermission({
          android: {
              detail: "fine"
          },
          ios: "whenInUse"
      }).then(granted => {
          console.log('Permission', granted)
          if(!granted){
              if(Object.keys(location).length === 0){
                Alert.alert('Location Needed', 'Please grant location permission so we could show you restaurants near you', [
                    {
                        text: "Grant",
                        style: "default",
                        onPress: () => handleUserLocation()
                    }
                ])
              }
              return
          }
          Geolocation.getCurrentPosition(
              (position) => {
                console.log(position)
                const point = {
                    type: "Point",
                    coordinates: [position.coords.longitude, position.coords.latitude]
                };
                // updating state
                setLocationPoint(point)
                loadSearchResults()
                // getting address out of coords
                ReverseGeocode(position.coords.latitude, position.coords.longitude).then(location => {
                    // saving it on server
                    UpdateProfile({locationPoint: point, location: location})
                    // updating state
                    setLocation(location)
                }).catch(err => {
                  console.log("Error getting rev geocode", err)
                })
              },
              (error) => {
                // See error code charts below.
                console.log(error.code, error.message)
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          )
      }).catch(err => {
          console.log('Error getting location permission', err)
      })
  }

  useState(() => {
    GetProfile().then(profile => {
      setLocation(profile.location ?? {})
      setLocationPoint(profile.locationPoint ?? {})
      loadSearchResults();
    }).finally(() => handleUserLocation())

    props.navigation.addListener('focus', () => {
      loadSearchResults()
    })
  }, [])

  return (
    <View style={style.storeContainer}>
      <View style={style.locationContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleUserLocation}
          style={style.locationInnerContainer}>
          <IconMI
            name="location-pin"
            size={20}
            color={AppConfig.primaryColor}
          />
          <Text style={style.locationText}>{GetTrimmedLocation(location.label)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleProfile}
          style={style.profileImageContainer}>
          <Image
            style={style.profileImage}
            source={require('../../../assets/logo.png')}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={style.textInputContainer}>
        <IconMI
            name="search"
            size={25}
            color="#8c8c8c"
          />
        <TextInput
          style={style.textInput}
          placeholder="Search here"
          s
        />
      </View> */}
      <ScrollView 
        contentContainerStyle={style.scrollContainer}
        refreshControl={<RefreshControl refreshing={loadingResults} onRefresh={loadSearchResults} />}>
        {restros.map(restro => {
          return(
            <RestaurantCard
              name={restro.name}
              distance={(restro.distanceInMeters / 1000).toFixed(2)}
              rating={`${restro.rating ?? 0} (${restro.ratingCount ?? 0} ratings)`}
              onPress={() => handelCardPress(restro.userId)}
            />
          )
        })}

        {!loadingResults && restros.length === 0 && <Image style={style.noResult} source={NoResult} />}
        {!loadingResults && restros.length === 0 && <Text style={style.noResultText}>No Restaurants are open near you at the moment</Text>}
        

        {loadingResults && <ActivityIndicator size="large" color={AppConfig.primaryColor} />}

        {(!loadingResults && restros.length !== 0 && (restros.length % 10 === 0)) &&
        <TouchableOpacity activeOpacity={0.8} onPress={loadMoreResults}>
          <Text style={style.loadMore}>Load More</Text>
        </TouchableOpacity>}

      </ScrollView>
    </View>
  )
}
const style = StyleSheet.create({
  storeContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  locationInnerContainer: {
    flexDirection: 'row',
  },
  locationText: {
    marginHorizontal: 10,
    textDecorationLine: 'underline',
    color: AppConfig.primaryColor,
    textDecorationColor: AppConfig.primaryColor,
    fontWeight: '700',
  },
  profileImageContainer: {
    width: 35,
    height: 35,
  },
  profileImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#C1C1C1',
    borderRadius: 3,
    paddingHorizontal: 10
  },
  textInput: {
    height: "100%",
    flex: 1
  },
  loadMore: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 16,
    color: AppConfig.primaryColor,
    fontWeight: 'bold'
  },
  noResult: {
    width: "100%",
    height: 300,
    resizeMode: 'contain',
  },
  noResultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: AppConfig.primaryColor
  }
})

export default Explore
