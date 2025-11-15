import { Provider } from "react-redux";
import store from "./redux/store"; 
import RootNavigator from './navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import toastConfig from './common/component/Toast/toastConfig';

const App = () => {
    return (
        <Provider store={store}>
            <RootNavigator />
            <Toast config={toastConfig}/>
        </Provider>
    )
}

export default App