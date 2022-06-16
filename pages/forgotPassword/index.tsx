import { sendPasswordResetEmail } from 'firebase/auth';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
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
	StyledOverlay,
	SubmitBtn,
} from '../../components/styled components/shared-styles/AuthPages';
import { SuccessMessage } from '../../components/styled components/SuccessMessgae';
import { Textbox } from '../../components/styled components/Textbox';
import { routes } from '../../constants/routes';
import { AuthPagesBgPath } from '../../constants/urls/images';
import { auth } from '../../lib/firebase/firebase';

export default function ForgotPassword() {
	const [formData, setFormData] = useState({ email: '' });
	const { email } = formData;

	function handleSetFormData(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	const {
		mutate: sendResetLinkMutation,
		isLoading,
		error,
		status,
	} = useMutation<void, Error>('sendResetLink', () =>
		sendPasswordResetEmail(auth, email)
	);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		sendResetLinkMutation();
	}

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
				<Heading>Reset Password</Heading>
				<Textbox
					placeholder='Email'
					type='email'
					name='email'
					value={email}
					required
					onChange={handleSetFormData}
				/>

				<Grid gap={1}>
					{error && <ErrorMessage>{error.message}</ErrorMessage>}
					{status === 'success' && (
						<StyledSuccessMessage>
							Email sent (check spam too)
						</StyledSuccessMessage>
					)}

					<SubmitBtn color='red' isLoading={isLoading}>
						Send Reset Link
					</SubmitBtn>

					<NextLink href={routes.login}>
						<StyledLink>Back to Login</StyledLink>
					</NextLink>
				</Grid>
			</Form>
		</Container>
	);
}

const StyledSuccessMessage = styled(SuccessMessage)`
	text-align: center;
`;

const StyledLink = styled(Link)`
	font-weight: 400;
	font-size: var(--size-350);
	text-align: center;
	display: block;
`;
