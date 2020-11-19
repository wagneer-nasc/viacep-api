import React from 'react';
import { StatusBar, View } from 'react-native';
import Dashboard from '../src/pages/dashboard';

const App: React.FC = () => {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={{ flex: 1, backgroundColor: '#312e38' }} >
                <Dashboard />
            </View>

        </>

    )
}

export default App;