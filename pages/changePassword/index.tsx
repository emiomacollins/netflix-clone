import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import { ErrorMessage } from '../../components/styled components/ErrorMessage';
import { Grid } from '../../components/styled components/Grid';
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
import { AuthPagesBgPath } from '../../constants/urls/images';

export default function ForgotPassword() {
	const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' });
	const { oldPassword, newPassword } = formData;

	function handleSetFormData(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	const {
		mutate: sendResetLinkMutation,
		isLoading,
		error,
		status,
	} = useMutation<void, Error>('sendResetLink', () => {});

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		sendResetLinkMutation();
	}

	return (
		<Container>
			<Head>
				<title>Change Password</title>
			</Head>

			<Header>
				<Logo />
			</Header>

			<BgImage>
				<Image src={AuthPagesBgPath} alt='' layout='fill' />
			</BgImage>
			<StyledOverlay />

			<Form onSubmit={handleSubmit}>
				<Heading>Change Password</Heading>
				<Grid gap={1.5}>
					<Textbox
						placeholder='Old Password'
						type='password'
						name='oldPassword'
						value={oldPassword}
						required
						onChange={handleSetFormData}
					/>
					<Textbox
						placeholder='New Password'
						type='password'
						name='newPassword'
						value={newPassword}
						required
						onChange={handleSetFormData}
					/>
				</Grid>

				<Grid gap={1}>
					{error && <ErrorMessage>{error.message}</ErrorMessage>}
					{status === 'success' && (
						<StyledSuccessMessage>
							Email sent (check spam too)
						</StyledSuccessMessage>
					)}

					<SubmitBtn color='red' isLoading={isLoading}>
						Change Password
					</SubmitBtn>
				</Grid>
			</Form>
		</Container>
	);
}

const StyledSuccessMessage = styled(SuccessMessage)`
	text-align: center;
`;
