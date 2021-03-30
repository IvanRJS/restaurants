import React from 'react';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs()

import Navigation from './navigations/Navigation';

export default function App() {
  return (
   <Navigation></Navigation>
  )
}



