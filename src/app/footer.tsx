import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Footer = (): React.JSX.Element => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					alignItems={'center'}
					width={1}
					flexDirection={{ xs: 'column', sm: 'row' }}
				>
					<Box display={'flex'} component="a" href="/" title="CleanChain" width={80}>
						<Box component={'img'} src="ethglobal.svg" height={0.9} width={0.9} />
					</Box>
					<Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
						<Box marginTop={1} marginRight={2}>
							<Link
								underline="none"
								component="a"
								href="/"
								color="text.primary"
								variant={'subtitle2'}
							>
								Home
							</Link>
						</Box>
						<Box marginTop={1}>
							<Button
								variant="outlined"
								color="primary"
								component="a"
								href="/explore"
								size="small"
							>
								Explore
							</Button>
						</Box>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Typography
					align={'center'}
					variant={'subtitle2'}
					color="text.secondary"
					gutterBottom
				>
					&copy; popov. 2023. All rights reserved
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Footer;
