import * as GS from '@gluestack-ui/themed';
import CardExample from '@assets/cardExample.png';
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { IdentifyStatus } from './IdentifyStatus';
import { TouchableOpacity } from 'react-native';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof TouchableOpacity> &{
	isOwnUser: boolean;
};

export function CardAds({ isOwnUser = false, ...rest }: Props) {
	return (
		<TouchableOpacity style={{ width: '47%',marginRight: 18, }} {...rest}>
			<GS.VStack>
				<GS.ImageBackground
					source={CardExample}
					h={100}
					p="$2"
					alt="Logo"
					resizeMode="cover"
					imageStyle={{ borderRadius: 8 }}
				>
					<GS.HStack w="$full">
						<GS.Box flex={1}>
							{!isOwnUser && (
								<GS.Image source={defaultUserPhotoImg} width={28} height={28} alt="Logo"/>
							)}
						</GS.Box>

						<IdentifyStatus status="usado" />
					</GS.HStack>
				</GS.ImageBackground>
				<GS.Text fontSize="$sm">Bicicleta</GS.Text>
				<GS.Text fontFamily="$heading" fontSize="$sm">
					R$ 120,00
				</GS.Text>
			</GS.VStack>
		</TouchableOpacity>
	);
}
