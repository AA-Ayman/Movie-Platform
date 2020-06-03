import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import RatingScreen from './src/screens/RatingScreen';
const navigator = createStackNavigator(
  {
    Main: MainScreen,
    Rating:RatingScreen
    
      
  },

  {
    initalRouteName: 'Main',
    defaultNavigationOptions: {
    header:null
    }
    
    
  }
);



export default createAppContainer(navigator);
