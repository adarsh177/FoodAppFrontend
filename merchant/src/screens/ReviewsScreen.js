import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import ReviewCard from '../components/ReviewCard';

function ReviewsScreen(props) {
  const [loadingReviews, setLoadingReviews] = useState(false);

  const loadReviews = () => {
    // setLoadingReviews(true);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <View style={style.reviewsContainer}>
      <ScrollView
        contentContainerStyle={style.scrollContainer}
        refreshControl={
          <RefreshControl onRefresh={loadReviews} refreshing={loadingReviews} />
        }>
        <Text style={style.subhead}>
          All customer reviews will appear here.
        </Text>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  reviewsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  subhead: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  scrollContainer: {
    padding: 10,
  },
});

export default ReviewsScreen;
