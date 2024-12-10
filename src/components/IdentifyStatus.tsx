import * as GS from '@gluestack-ui/themed';

type Props = {
	status: 'usado' | 'novo';
};

export function IdentifyStatus({ status }: Props) {
	return (
		<GS.Box paddingHorizontal="$1.5" bg={
      status === 'novo' ? '$blue700' : '$gray200'
    } borderRadius="$full" maxHeight={15}>
			<GS.Text textTransform="uppercase" fontFamily='$heading' color="$gray600" fontSize="$xs">
				{status}
			</GS.Text>
		</GS.Box>
	);
}
