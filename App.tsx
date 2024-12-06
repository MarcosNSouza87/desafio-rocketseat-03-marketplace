import { StatusBar } from 'react-native';
import {
	useFonts,
	Karla_700Bold,
	Karla_400Regular,
} from '@expo-google-fonts/karla';
import { GluestackUIProvider, Text, Center } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
// import { AuthContextProvider } from '@contexts/AuthContext';
// import { useAuth } from '@hooks/useAuth';

export default function App() {
	const [fontsLoaded] = useFonts({ Karla_700Bold, Karla_400Regular });

	// const {user} = useAuth();

	return (
		<GluestackUIProvider config={config}>
			<StatusBar
				barStyle="light-content"
				translucent
				backgroundColor={'transparent'}
			/>
			{/* <AuthContextProvider> */}
				{fontsLoaded ? <Routes /> : <Loading />}
			{/* </AuthContextProvider> */}
		</GluestackUIProvider>
	);
}
