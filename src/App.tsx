import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/reducer';
import Field from './components/Field';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Field />
      </div>
    </Provider>
  );
}

export default App;
