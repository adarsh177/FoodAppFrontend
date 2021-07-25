import React, {useEffect, useState} from 'react'
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
import { GetIngredientsAndTags } from '../../../APIs/IngredientsManager'

function Explore(props) {
  const [location, setLocation] = useState({})
  const [locationPoint, setLocationPoint] = useState({})
  const [restros, setRestros] = useState([])
  const [loadingResults, setLoadingResults] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [filterTags, setFilterTags] = useState([])
  const [seletedFilterTags, setSelectedFilterTags] = useState([])
  const [searchText, setSearchText] = useState('')
  
  let searchTime = 0;

  const handelCardPress = (restroId, itemId) => {
    props.navigation.push('restaurantMenu', {merchantId: restroId, showItem: itemId})
  }

  const handleProfile = () => {
    props.navigation.push('userProfile')
  }

  const GetTrimmedLocation = (locationText) => {
    return locationText ? locationText : 'Fetching Location';
  }

  const loadSearchResults = () => {
    setLoadingResults(true)
    SearchNearMe(searchText, seletedFilterTags.join(','), 0).then(val => {
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
                setTimeout(loadSearchResults, 1500)
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

  const toggleTag = (tag) => {
    if(seletedFilterTags.includes(tag)){
      const newList = seletedFilterTags.filter(val => val !== tag)
      setSelectedFilterTags(newList)
    }else{
      setSelectedFilterTags([tag, ...seletedFilterTags])
    }
  }

  // loading when tags toggled
  useEffect(() => {
    loadSearchResults()
  }, [seletedFilterTags])

  useEffect(() => {
    const currTime = new Date().getTime()
    if(searchTime == 0 || searchTime < currTime){
      console.log('Performing search')
      setTimeout(loadSearchResults, 1000)
      searchTime = currTime + 1000
    }
  }, [searchText])

  // onetime useEffect
  useEffect(() => {
    // loading profile
    GetProfile().then(profile => {
      setLocation(profile.location ?? {})
      setLocationPoint(profile.locationPoint ?? {})
      
      // checking if location already exists else insisting for new
      if(profile.locationPoint && profile.locationPoint.coordinates && profile.locationPoint.coordinates.length === 2){
        // location already exists hence a general check
        Alert.alert('Location', 'Update your location to get best deals near you', [
          {
            text: 'Update Location',
            onPress: handleUserLocation,
            style: "default"
          },
          {
            text: 'No Thanks',
            onPress: loadSearchResults,
            style: "cancel"
          }
        ])
      }else{
        Alert.alert('Location Needed', 'We need your location to show offers near you', [
          {
            text: 'Update Location',
            onPress: handleUserLocation,
            style: "default"
          }
        ], {
          cancelable: false
        })
      }
    })

    // loading tags
    GetIngredientsAndTags()
      .then(response => {
        setFilterTags(response.tags)
      })
      .catch(err => alert(err))
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
            size={25}
            color={AppConfig.primaryColor}
          />
          <Text numberOfLines={1} style={style.locationText}>{GetTrimmedLocation(location.label)}</Text>
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

      {/* Search Container */}
      <View style={style.textInputContainer}>
        <IconMI
            name="search"
            size={25}
            color="#8c8c8c"
          />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={style.textInput}
          placeholder="Search here"
        />
        {searchText.length > 0 &&
        <TouchableOpacity onPress={() => setSearchText('')} activeOpacity={0.8} style={style.searchClose}>
          <IconMI
              name="close"
              size={15}
              color="#fff"
            />
        </TouchableOpacity>}
      </View>

      {/* Filter container */}
      {filterTags.length > 0 && 
      <View style={{width: '100%', height: 60}}>
        <ScrollView style={{paddingVertical: 0, width: "100%"}} horizontal contentContainerStyle={style.filterCapsuleContainer}>
          
          {seletedFilterTags.length > 0 &&
          <TouchableOpacity onPress={() => setSelectedFilterTags([])} style={{marginRight: 10}} key={"clear"}>
            <Text style={[style.capsule, {color: '#d42522', borderColor: '#d42522'}]}>Clear</Text>
          </TouchableOpacity>}

          {filterTags.map(tag => {
            return(
              <TouchableOpacity onPress={() => toggleTag(tag)} activeOpacity={0.8} style={{marginRight: 10}} key={tag}>
                <Text style={[style.capsule, seletedFilterTags.includes(tag) ? style.selectedCapsule : {}]}>{tag}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>}

      <ScrollView 
        contentContainerStyle={{marginTop: 10}}
        refreshControl={<RefreshControl refreshing={loadingResults} onRefresh={loadSearchResults} />}>
        {restros.map(restro => {
          return(
            <RestaurantCard
              merchantId={restro.userId}
              name={restro.name}
              distance={(restro.distanceInMeters / 1000).toFixed(2)}
              rating={`${restro.rating ? restro.rating.toFixed(1) : 0} Stars (${restro.ratingCount ?? 0})`}
              image={restro.bannerImage}
              onPress={() => handelCardPress(restro.userId, false)}
              onItemPressed={id => handelCardPress(restro.userId, id)}
            />
          )
        })}

        {!loadingResults && restros.length === 0 && <Image style={style.noResult} source={NoResult} />}
        {!loadingResults && restros.length === 0 && <Text style={style.noResultText}>No Restaurants are open near you at the moment</Text>}

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
    borderBottomColor: AppConfig.primaryColor,
    borderBottomWidth: 2,
    paddingRight: 5,
    maxWidth: 150,
    color: AppConfig.primaryColor,
    textDecorationColor: AppConfig.primaryColor,
    fontWeight: '700',
    fontSize: 16
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
    alignItems: 'center',
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#696969',
    borderRadius: 30,
    paddingHorizontal: 10
  },
  textInput: {
    height: "100%",
    flex: 1,
    fontSize: 16,
    color: '#4a4a4a'
  },
  filterCapsuleContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0
  },
  capsule: {
    borderRadius: 100,
    borderColor: AppConfig.primaryColor,
    borderWidth: 1,
    backgroundColor: '#fff',
    color: AppConfig.primaryColor,
    paddingVertical: 5,
    paddingHorizontal: 20,
    maxWidth: 150,
    fontSize: 16,
    fontWeight: 'bold'
  },
  selectedCapsule: {
    color: '#fff',
    backgroundColor: AppConfig.primaryColor
  },
  searchClose: {
    position: 'absolute',
    right: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#d42522'
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
