import './App.css';
import MainComponent from './components/MainComponent';
import ServiceContextProvider from './services/serviceContext';

function App() {
  return (
    <ServiceContextProvider>
      <MainComponent/>
    </ServiceContextProvider>
  );
}

export default App;
