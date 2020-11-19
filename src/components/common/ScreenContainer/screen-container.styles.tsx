import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';


export const ScreenContainer = styled(SafeAreaView)`
flex:1;
background-color: ${props => props.theme.palette.background.main};
padding: 0px 20px ;
align-items: center;
justify-content: flex-start;
`