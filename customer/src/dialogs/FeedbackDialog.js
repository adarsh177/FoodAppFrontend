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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppConfig from '../../AppConfig.json';
import {SendFeedback} from '../APIs/ProfileManager';

function FeedbackDialog(props) {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const close = () => {
    setFeedback('');
    setLoading(false);

    props.close();
  };

  const sendFeedback = () => {
    if (feedback.length === 0) return;

    setLoading(true);
    SendFeedback(feedback)
      .then(() => {
        close();
      })
      .catch(err => {
        console.log('Error sending feedback', err);
        alert('Error sending feedback');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        close();
      }}>
      <View style={style.mainContainer}>
        <View style={style.dialog}>
          <Text style={style.title}>Feedback</Text>
          <Text style={style.subtitle}>
            Your feedbacks helps us improve ourself
          </Text>
          <TextInput
            placeholder="Type here..."
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            style={style.feedbackBox}
            onChangeText={setFeedback}
          />

          {loading ? (
            <ActivityIndicator size="large" color={AppConfig.primaryColor} />
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={sendFeedback}>
              <Text style={style.sendBtn}>Send</Text>
            </TouchableOpacity>
          )}
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
  dialog: {
    width: '90%',
    flexDirection: 'column',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppConfig.primaryColor,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#8c8c8c',
    marginBottom: 20,
  },
  feedbackBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: AppConfig.primaryColor,
    borderRadius: 3,
    marginBottom: 20,
    fontSize: 16,
  },
  sendBtn: {
    width: '100%',
    padding: 10,
    backgroundColor: AppConfig.primaryColor,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    textAlign: 'center',
  },
});

export default FeedbackDialog;
