import React from 'react';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs()
LogBox.ignoreLogs(['Setting a timer'])

import Navigation from './navigations/Navigation';

export default function App() {
  return (
   <Navigation></Navigation>
  )
}



