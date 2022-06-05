import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import Nav from '../../components/Nav';
import Show from '../../components/Show';
import { Link } from '../../components/styled components/Link';
import {
	BgImage,
	Container,
	Form,
	Heading,
	Inputs,
	StyledOverlay,
	SubmitBtn,
	Text,
} from '../../components/styled components/shared-styles/AuthPages';
import { Textbox } from '../../components/styled components/Textbox';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';
import { AuthPagesBackgroundImage } from '../../constants/urls/images';

export default function SignUp() {
	return (
		<Container>
			<Head>
				<title>Sign Up</title>
			</Head>

			<Nav />

			<Show on={Breakpoints.tabletUp}>
				<BgImage>
					<Image src={AuthPagesBackgroundImage} alt='' layout='fill' />
				</BgImage>
				<StyledOverlay />
			</Show>

			<Form>
				<Heading>Sign Up</Heading>
				<Inputs>
					<Textbox placeholder='Email' type='email' />
					<Textbox placeholder='password' type='password' />
					<Textbox placeholder='Confirm password' type='password' />
				</Inputs>
				<SubmitBtn color='red'>Sign Up</SubmitBtn>
				<Text>
					Already have an account?{' '}
					<NextLink href={routes.login}>
						<Link>Sign in</Link>
					</NextLink>
				</Text>
			</Form>
		</Container>
	);
}
