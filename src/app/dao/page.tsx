'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import Container from "@/app/container";
import Header from "@/app/header";
import useProviderStore from "@/app/store";

export const mock = [
	{
		title: 'Proposal 1',
		votesFor: '100',
		votesAgainst: '5',
	},
	{
		title: 'Proposal 2',
		votesFor: '10',
		votesAgainst: '50',
	},
	{
		title: 'Proposal 3',
		votesFor: '130',
		votesAgainst: '1',
	},
];

const mockDao = [
	{
		title: '300+',
		subtitle:
			'Members',
		suffix: '+',
	},
	{
		title: '5K+',
		subtitle:
			'Proposals',
		suffix: 'K+',
	},
	{
		title: '15K+',
		subtitle: 'Votes',
		suffix: 'K+',
	},
];

export default function DaoDetail() {
	const provider = useProviderStore((state) => state.provider)
	const ownerAddress = useProviderStore((state) => state.ownerAddress)
	console.log('DaoDetail');
	console.log(provider);
	console.log(ownerAddress);

	return (
		<Box>
			<Header/>
			<Box>
				<Box marginBottom={4}>
					<Typography
						variant={'h4'}
						gutterBottom
						align={'center'}
						sx={{ fontWeight: 700 }}
					>
						DAO name
					</Typography>

					<Typography
						variant={'h6'}
						component={'p'}
						align={'center'}
					>
						DAO description :
						Lorem ipsum dolor sit amet. Rem consequatur natus est nihil iure qui nostrum accusantium ad quidem molestias At possimus voluptatibus et possimus eligendi. Est dolor architecto ab perspiciatis facilis sit quia rerum et nemo fugiat ab suscipit neque. Et neque porro ab sapiente rerum et laborum praesentium aut neque sunt qui omnis facere qui provident obcaecati hic numquam nisi.
					</Typography>
				</Box>
			</Box>
			<Container>
				<Grid container spacing={2}>
					{mockDao.map((item, i) => (
						<Grid key={i} item xs={12} md={4}>
							<Typography
								variant="h3"
								align={'center'}
								fontWeight={700}
								gutterBottom
							>
								{item.title}
							</Typography>
							<Typography
								color="text.secondary"
								align={'center'}
								component="p"
							>
								{item.subtitle}
							</Typography>
						</Grid>
					))}
				</Grid>
			</Container>
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
											{`${item.votesFor} / ${item.votesAgainst}`}
										</Typography>
									</Box>
									<a href={"/proposal"}>
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
	)
}