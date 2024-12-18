import * as GS from '@gluestack-ui/themed';
import CardExample from '@assets/cardExample.png';
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { IdentifyStatus } from './IdentifyStatus';
import { TouchableOpacity } from 'react-native';
import { ComponentProps } from 'react';
import { Loading } from './Loading';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';

type Props = ComponentProps<typeof TouchableOpacity> & {
	info: ProductDTO;
};

export function CardAds({ info, ...rest }: Props) {
	const { user } = useAuth();

	

	if (info) {
		return (
			<TouchableOpacity style={{ width: '47%', marginRight: 18 }} {...rest}>
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
								{user.id !== info.user_id && (
									<GS.Image
										source={{ uri: `${api.defaults.baseURL}/images/${info.user?.avatar}` }}
										width={28}
										height={28}
										alt="Logo"
										style={{borderRadius: '100%'}}
									/>
								)}
							</GS.Box>

							<IdentifyStatus status={info.is_new ? 'novo' : 'usado'} />
						</GS.HStack>
					</GS.ImageBackground>
					{info.is_active === false && (
						<GS.Box
							position="absolute"
							w="$full"
							h={100}
							alignItems="center"
							justifyContent="center"
							borderRadius='$md'
							style={{backgroundColor: '#00000088'}}
						>
							<GS.Text color="$white" fontFamily='$heading' fontSize='$sm' >Anuncio Desativado</GS.Text>
						</GS.Box>
					)}
					<GS.Text fontSize="$sm">{info.name}</GS.Text>
					<GS.Text fontFamily="$heading" fontSize="$sm">
						R$ {info.price.toFixed(2).replace('.', ',')}
					</GS.Text>
				</GS.VStack>
			</TouchableOpacity>
		);
	} else {
		return <Loading />;
	}
}
