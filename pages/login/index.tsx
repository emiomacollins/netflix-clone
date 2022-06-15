import { UserCredential } from 'firebase/auth';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Logo from '../../components/Logo';
import { ErrorMessage } from '../../components/styled components/ErrorMessage';
import { Grid } from '../../components/styled components/Grid';
import { Link } from '../../components/styled components/Link';
import {
	BgImage,
	Container,
	Form,
	Header,
	Heading,
	Inputs,
	StyledOverlay,
	SubmitBtn,
	Text,
} from '../../components/styled components/shared-styles/AuthPages';
import { Textbox } from '../../components/styled components/Textbox';
import { routes } from '../../constants/routes';
import { AuthPagesBgPath } from '../../constants/urls/images';
import { auth, AuthProps, signInWithEmailAndPassword } from '../../lib/firebase/firebase';

export default function Login() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

	const {
		error,
		mutate: loginMutation,
		isLoading,
	} = useMutation<UserCredential, Error, AuthProps>(
		'login',
		signInWithEmailAndPassword,
		{
			onSuccess: () => {
				router.push(routes.home);
			},
		}
	);

	function handleSetFormData(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		loginMutation(formData);
	}

	useEffect(() => {
		auth.signOut();
	}, []);

	return (
		<Container>
			<Head>
				<title>Login</title>
			</Head>

			<Header>
				<Logo />
			</Header>

			<BgImage>
				<Image src={AuthPagesBgPath} alt='' layout='fill' />
			</BgImage>
			<StyledOverlay />

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
				<Grid gap={0}>
					{error && <ErrorMessage>{error.message}</ErrorMessage>}
					<SubmitBtn color='red' isLoading={isLoading}>
						Sign in
					</SubmitBtn>
				</Grid>
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
