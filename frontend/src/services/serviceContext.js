import React, {createContext} from 'react';
import MainService from '../services/mainService';

const backendURL= 'http://localhost:3001';

// created instance of service 
export const ServiceContext = createContext();

//added main service and backendURL to context provider
class ServiceContextProvider extends React.Component {
    constructor(props){
        super(props);
        this.state.mainService = new MainService(backendURL);
    }
    state = {}
    render() {
        return (
            <ServiceContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </ServiceContext.Provider>
        )
    }
}

export default ServiceContextProvider;

 