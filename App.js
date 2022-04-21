// In App.js in a new project

import React, {useEffect, useState} from 'react';
import {Button, View, Text, Pressable, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';

import mqtt from 'mqtt/dist/mqtt';

function HomeScreen({route, navigation}) {
  const client = mqtt.connect('wss://broker.emqx.io/mqtt', {port: 8084});

  const [isshow, setisshow] = useState(false);
  const [data, setdata] = useState(false);

  useEffect(() => {
    connectmqtt();
  }, []);

  const connectmqtt = () => {
    client.on('connect', () => {
      client.subscribe('Snapler123');
    });

    client.on('message', (topic, message) => {
      // let obj = JSON.parse(message.toString());
      let obj = message.toString();
      setdata(obj);
      setisshow(true);
      // console.log(obj);
    });
    return () => {
      client.end();
    };
  };
  const handleWaterON = () => {
    console.log('published');
    client.publish('ASoreterZ', '2');
  };
  const handleWaterOff = () => {
    console.log('published');
    client.publish('ASoreterZ', '3');
  };
  const handleFeedLineON = () => {
    console.log('published');
    client.publish('ASoreterZ', '1');
  };
  const handleFeedLineOff = () => {
    console.log('published');
    client.publish('ASoreterZ', '0');
  };
  const handleFeedON = () => {
    console.log('published');
    client.publish('ASoreterZ', '4');
  };
  const handleFeedOff = () => {
    console.log('published');
    client.publish('ASoreterZ', '5');
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* {isshow === true ? (
          <Text style={styles.contextText}>{data}</Text>
        ) : (
          <Text style={styles.contextText}>No Data</Text>
        )} */}
        {isshow === true ? (
          <Text style={styles.contextText}>Current Temp : {data} C</Text>
        ) : (
          <Text style={styles.contextText}>Current Temp : Nan</Text>
        )}
        <View style={styles.CommandButtonContainer}>
          <Pressable
            style={styles.CommandButton}
            onPress={() => {
              handleWaterON();
            }}>
            <Text style={styles.CommandButtonText}>Turn Water Pump On</Text>
          </Pressable>
          <Pressable
            style={[styles.CommandButton, {backgroundColor: 'red'}]}
            onPress={() => {
              handleWaterOff();
            }}>
            <Text style={styles.CommandButtonText}>Turn Water Pump Off</Text>
          </Pressable>
        </View>
        <Text style={styles.contextText}>Feeding Line Start At : 7:55 AM</Text>
        <View style={styles.CommandButtonContainer}>
          <Pressable
            style={styles.CommandButton}
            onPress={() => {
              handleFeedLineON();
            }}>
            <Text style={styles.CommandButtonText}>Turn Feeding Line On</Text>
          </Pressable>
          <Pressable
            style={[styles.CommandButton, {backgroundColor: 'red'}]}
            onPress={() => {
              handleFeedLineOff();
            }}>
            <Text style={styles.CommandButtonText}>Turn Feeding Line Off</Text>
          </Pressable>
        </View>
        <Text style={styles.contextText}>
          Feeding System Active At : 8:00 AM
        </Text>
        <View style={styles.CommandButtonContainer}>
          <Pressable
            style={styles.CommandButton}
            onPress={() => {
              handleFeedON();
            }}>
            <Text style={styles.CommandButtonText}>Turn Feeding System On</Text>
          </Pressable>
          <Pressable
            style={[styles.CommandButton, {backgroundColor: 'red'}]}
            onPress={() => {
              handleFeedOff();
            }}>
            <Text style={styles.CommandButtonText}>
              Turn Feeding System Off
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// function FirstStallScreen({route, navigation}) {
//   const {CTemp} = route.params;

//   // const [alertMessage, setAlertMessage] = React.useState('');
//   // const waterOnAlert = () => {
//   //   setAlertMessage('Water Pump On');
//   // };
//   // const waterOffAlert = () => {
//   //   setAlertMessage('Water Pump Off');
//   // };
//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.contextText}>Current Temp : {CTemp}</Text>
//         <View style={styles.CommandButtonContainer}>
//           <Pressable
//             style={styles.CommandButton}
//             onPress={() => {
//               setTimeout(() => {
//                 Alert.alert('', 'Turning Water Pump On');
//               }, -1000);
//             }}>
//             <Text style={styles.CommandButtonText}>Turn Water Pump On</Text>
//           </Pressable>
//           <Pressable
//             style={[styles.CommandButton, {backgroundColor: 'red'}]}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.CommandButtonText}>Turn Water Pump Off</Text>
//           </Pressable>
//         </View>
//         <Text style={styles.contextText}>Feeding Line Start At : {}</Text>
//         <View style={styles.CommandButtonContainer}>
//           <Pressable
//             style={styles.CommandButton}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.CommandButtonText}>Turn Feeding Line On</Text>
//           </Pressable>
//           <Pressable
//             style={[styles.CommandButton, {backgroundColor: 'red'}]}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.CommandButtonText}>Turn Feeding Line Off</Text>
//           </Pressable>
//         </View>
//         <Text style={styles.contextText}>Feeding System Active At : {}</Text>
//         <View style={styles.CommandButtonContainer}>
//           <Pressable
//             style={styles.CommandButton}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.CommandButtonText}>Turn Feeding System On</Text>
//           </Pressable>
//           <Pressable
//             style={[styles.CommandButton, {backgroundColor: 'red'}]}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.CommandButtonText}>
//               Turn Feeding System Off
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#121212',
  },
  header: {
    flex: 0.1,
    backgroundColor: '#242325',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: '5%',
    fontFamily: 'Roboto-Bold',
  },
  content: {
    flex: 1,
  },
  contextText: {
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'center',
    margin: '5%',
  },
  button: {
    width: 180,
    height: 180,
    backgroundColor: '#707070',
    borderRadius: 6,
    elevation: 20,
    shadowColor: '#52006A',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
  CommandButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  CommandButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 100,
    height: 50,
    backgroundColor: 'lightgreen',
    borderRadius: 6,
    margin: '5%',
  },
  CommandButtonText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    padding: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    padding: 8,
  },
  buttonSubText: {
    color: '#fff',
    fontSize: 14,
    padding: 8,
  },
});
export default App;
