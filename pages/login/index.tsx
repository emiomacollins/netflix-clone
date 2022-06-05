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

export default function Login() {
	return (
		<Container>
			<Head>
				<title>Login</title>
			</Head>

			<Show on={Breakpoints.tabletUp}>
				<BgImage>
					<Image src={AuthPagesBackgroundImage} alt='' layout='fill' />
				</BgImage>
				<StyledOverlay />
			</Show>

			<Nav />

			<Form>
				<Heading>Sign in</Heading>
				<Inputs>
					<Textbox placeholder='Email' type='email' />
					<Textbox placeholder='Password' type='password' />
				</Inputs>
				<SubmitBtn color='red'>Sign in</SubmitBtn>
				<Text>
					New to Netflix?{' '}
					<NextLink href={routes.signUp}>
						<Link>Sign up now</Link>
					</NextLink>
				</Text>
			</Form>
		</Container>
	);
}
