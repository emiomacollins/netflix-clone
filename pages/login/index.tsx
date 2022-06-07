import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
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
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	function handleSetFormData(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		alert(JSON.stringify(formData));
	}

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

			<Form onSubmit={handleSubmit}>
				<Heading>Sign in</Heading>
				<Inputs>
					<Textbox
						placeholder='Email'
						type='email'
						name='email'
						value={email}
						required
						onChange={handleSetFormData}
					/>
					<Textbox
						placeholder='Password'
						type='password'
						name='password'
						value={password}
						required
						onChange={handleSetFormData}
					/>
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
