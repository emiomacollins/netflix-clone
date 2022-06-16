import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import Textbox from '../../components/formik/Textbox';
import Logo from '../../components/Logo';
import { ErrorMessage } from '../../components/styled components/ErrorMessage';
import { Grid } from '../../components/styled components/Grid';
import { Link } from '../../components/styled components/Link';
import {
	BgImage,
	Container,
	Form as StyledForm,
	Header,
	Heading,
	Inputs,
	StyledOverlay,
	SubmitBtn,
	Text,
} from '../../components/styled components/shared-styles/AuthPages';
import { routes } from '../../constants/routes';
import { AuthPagesBgPath } from '../../constants/urls/images';
import { auth } from '../../lib/firebase/firebase';
import { AuthProps } from '../login';

export default function SignUp() {
	const router = useRouter();
	const {
		mutate: signUpMutation,
		isLoading,
		error,
	} = useMutation<UserCredential, Error, AuthProps>(
		'signInWithEmailAndPassword',
		({ email, password }) => createUserWithEmailAndPassword(auth, email, password),
		{
			onSuccess: () => {
				router.push(routes.home);
			},
		}
	);

	return (
		<Container>
			<Head>
				<title>Sign Up</title>
			</Head>

			<Header>
				<Logo />
			</Header>

			<BgImage>
				<Image src={AuthPagesBgPath} alt='' layout='fill' />
			</BgImage>
			<StyledOverlay />

			<Formik
				initialValues={{ email: '', password: '', confirmPassword: '' }}
				onSubmit={async (values) => signUpMutation(values)}
				validationSchema={yup.object({
					email: yup
						.string()
						.email('invalid email')
						.required('email is required'),
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
						<SubmitBtn color='red' isLoading={isLoading}>
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
