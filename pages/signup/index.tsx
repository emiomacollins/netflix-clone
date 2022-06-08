import { UserCredential } from 'firebase/auth';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import Textbox from '../../components/formik/Textbox';
import Nav from '../../components/Nav';
import Show from '../../components/Show';
import { ErrorMessage } from '../../components/styled components/ErrorMessage';
import { Grid } from '../../components/styled components/Grid';
import { Link } from '../../components/styled components/Link';
import {
	BgImage,
	Container,
	Form as StyledForm,
	Heading,
	Inputs,
	StyledOverlay,
	SubmitBtn,
	Text,
} from '../../components/styled components/shared-styles/AuthPages';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';
import { AuthPagesBackgroundImage } from '../../constants/urls/images';
import { AuthProps, signUpWithEmailAndPassword } from '../../firebase/firebase';

export default function SignUp() {
	const {
		mutate: signUpMutation,
		isLoading,
		error,
	} = useMutation<UserCredential, Error, AuthProps>( // <Return type, Error type, Parameters type>
		'signInWithEmailAndPassword',
		signUpWithEmailAndPassword,
		{
			onSuccess: () => {},
		}
	);

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

			<Formik
				initialValues={{ email: '', password: '', confirmPassword: '' }}
				onSubmit={async (values) => signUpMutation(values)}
				validationSchema={yup.object({
					email: yup.string().required('email is required'),
					password: yup
						.string()
						.required('password is required')
						.min(4)
						.max(60),
					confirmPassword: yup
						.string()
						.oneOf([yup.ref('password')], 'Passwords must match')
						.required('required'),
				})}
			>
				<StyledForm as={Form}>
					<Heading>Sign Up</Heading>
					<Inputs>
						<Textbox placeholder='Email' type='email' name='email' />
						<Textbox placeholder='password' type='password' name='password' />
						<Textbox
							placeholder='Confirm password'
							type='password'
							name='confirmPassword'
						/>
					</Inputs>
					<Grid gap={0}>
						{error && <ErrorMessage>{error.message}</ErrorMessage>}
						<SubmitBtn color='red' loading={isLoading}>
							Sign Up
						</SubmitBtn>
					</Grid>
					<Text>
						Already have an account?{' '}
						<NextLink href={routes.login}>
							<Link>Sign in</Link>
						</NextLink>
					</Text>
				</StyledForm>
			</Formik>
		</Container>
	);
}
