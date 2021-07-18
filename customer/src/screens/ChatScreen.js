import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

//sender component -----------------------------------
function Sender(props) {
  return (
    <View style={style.messageSenderContainer}>
      <Image style={style.avtar} source={require('../assets/restaurant.jpg')} />
      <Text style={style.messageSenderText}>{props.message}</Text>
    </View>
  );
}

//receiver component -------------------------------------

function Receiver(props) {
  return (
    <View style={style.messageReceiverContainer}>
      <Text style={style.messageReceiverText}>{props.message}</Text>
      <Image style={style.avtar} source={require('../assets/restaurant.jpg')} />
    </View>
  );
}

function ChatScreen(props) {
  const messageSender = 'Sender dfghd fsdhfjdfb dghdgfhd fgfhdf ';
  const messageReceiver =
    'receiver jdkf jdnfjndf djfndf dfjdnfdfjdfnd df dnfdfdnf';

  // handle Send Message button -----------------------------------
  const handleSendMessage = () => {
    return null;
  };
  return (
    <View>
      <ScrollView style={style.chatContainer}>
        <View style={style.chatInnerContainer}>
          <Sender message={messageSender} />
          <Receiver message={messageReceiver} />
          <Sender message={messageSender} />
          <Receiver message={messageReceiver} />
          <Sender message={messageSender} />
          <Receiver message={messageReceiver} />
          <Sender message={messageSender} />
          <Receiver message={messageReceiver} />
          <Sender message={messageSender} />
          <Receiver message={messageReceiver} />
          <Sender message={messageSender} />
          <Receiver message={messageReceiver} />
          <Sender message={messageSender} />
          <Receiver message={messageReceiver} />
        </View>
      </ScrollView>
      <View style={style.inputTextContainer}>
        <TextInput style={style.textInput} placeholder="Enter code here" />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleSendMessage}
          style={style.sendMessageButton}>
          <IconMCI name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  chatContainer: {
    backgroundColor: '#f4f4f4',
    width: '100%',
    height: '85%',
  },
  chatInnerContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  messageSenderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  messageReceiverContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  messageSenderText: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 3,
    color: '#707070',
    maxWidth: '50%',
  },
  messageReceiverText: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 3,
    color: '#707070',
    maxWidth: '50%',
  },
  avtar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  inputTextContainer: {
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderBottomWidth: 0,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingRight: 60,
    paddingLeft: 10,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  sendMessageButton: {
    position: 'absolute',
    alignSelf: 'center',
    right: 27,
    backgroundColor: AppConfig.primaryColor,
    padding: 7,
    paddingLeft: 8,
    borderRadius: 3,
  },
});

export default ChatScreen;
