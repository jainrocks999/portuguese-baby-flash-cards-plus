import {
  StyleSheet,
  AppState,
  Alert,
  BackHandler,
  StatusBar,
  LogBox,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MyStack from './src/components/MyStack';
import {Provider} from 'react-redux';
import myStore from './src/reduxToolkit/MyStore';

import {SafeAreaView} from 'react-native-safe-area-context';
const App = () => {
  const appState = useRef(AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState(false);
  const [count, setCount] = useState(1);
  const handleAppStateChange = nextState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextState == 'active'
    ) {
      setAppStateVisible(true);
    }
    appState.current = nextState;
    if (appState.current == 'background') {
    }
  };
  useEffect(() => {
    const unsubscribe = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => unsubscribe.remove();
  }, []);

  function handleBackButtonClick() {
    showAdd1();

    return true;
  }

  const showAdd1 = () => {
    BackHandler.exitApp();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  LogBox.ignoreAllLogs();
  return (
    <Provider store={myStore}>
      <StatusBar backgroundColor="#73cbea" />
      <MyStack />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
