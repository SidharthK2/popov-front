'use client'

import styles from '../page.module.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CardContent} from "@mui/material";
import useProviderStore from "@/app/store";
import Header from "@/app/header";

const mock = [
	{
		title: 'Themeable',
		infos:
			'Customize any part of our components to match your design needs.',
	},
	{
		title: 'Light and dark UI',
		infos:
			'Optimized for multiple color modes. Use light or dark, your choice.',
	},
	{
		title: 'Composable',
		infos:
			'Designed with composition in mind. Compose new components with ease.',
	},
	{
		title: 'Developer experience',
		infos:
			'Guaranteed to boost your productivity when building your app or website.',
	},
	{
		title: 'Continuous updates',
		infos: 'We continually deploy improvements and new updates to theFront.',
	},
	{
		title: 'Free support',
		infos:
			'6 months of free technical support to help you build your website faster.',
	},
];

export default function Explore() {
	const provider = useProviderStore((state) => state.provider)
	const ownerAddress = useProviderStore((state) => state.ownerAddress)
	console.log('Explore');
	console.log(provider);
	console.log(ownerAddress);

	return (
		<>
			<Header/>
			<div className={styles.center}>
				<Box>
					<Box marginBottom={4}>
						<Typography
							variant={'h4'}
							gutterBottom
							align={'center'}
							sx={{ fontWeight: 700 }}
						>
							Explore DAOs
						</Typography>
						<Box marginTop={3} display={'flex'} justifyContent={'center'}>
							<Button
								component={'a'}
								href={'https://mui.com/store/items/the-front-landing-page/'}
								target={'_blank'}
								variant="contained"
								color="primary"
								size="large"
								endIcon={
									<svg
										width={16}
										height={16}
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 8l4 4m0 0l-4 4m4-4H3"
										/>
									</svg>
								}
							>
								Add DAO
							</Button>
						</Box>
					</Box>
					<Box maxWidth={800} margin={'0 auto'}>
						<Grid container spacing={2}>
							{mock.map((item, i) => (
								<Grid item xs={12} key={i}>
									<Box
										component={Card}
										variant={'outlined'}
										bgcolor={'transparent'}
										sx={{
											'&:hover': {
												boxShadow: 2,
											},
										}}
									>
										<Box
											component={CardContent}
											display={'flex'}
											alignItems={'center'}
										>
											<Box
												display={'flex'}
												flexDirection={{ xs: 'column', sm: 'row' }}
												flex={'1 1 100%'}
												justifyContent={{ sm: 'space-between' }}
												alignItems={{ sm: 'center' }}
											>
												<Typography
													variant={'h6'}
													fontWeight={700}
													sx={{ marginBottom: { xs: 1, sm: 0 } }}
												>
													{item.title}
												</Typography>
												<Typography variant={'subtitle1'} color={'text.secondary'}>
													{`${item.infos}`}
												</Typography>
											</Box>
											<a href={"/dao"}>
												<Box marginLeft={2} color={'primary.main'}>
													<Box
														component={'svg'}
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														width={{ xs: 30, sm: 40 }}
														height={{ xs: 30, sm: 40 }}
													>
														<path
															fillRule="evenodd"
															d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
															clipRule="evenodd"
														/>
													</Box>
												</Box>
											</a>
										</Box>
									</Box>
								</Grid>
							))}
						</Grid>
					</Box>
				</Box>
			</div>
		</>
	)
}
