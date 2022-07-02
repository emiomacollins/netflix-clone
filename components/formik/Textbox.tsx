import { FieldHookConfig, useField } from 'formik';
import styled from 'styled-components';
import { ErrorMessage } from '../styled-components/ErrorMessage';
import { Textbox as StyledTextbox } from '../styled-components/Textbox';

export default function Textbox(props: FieldHookConfig<string> & any) {
	const [fields, meta] = useField(props);
	const { touched, error: errorMessage } = meta;
	const error = touched && !!errorMessage;

	return (
		<Container>
			<StyledTextbox {...fields} {...props} error={error} />
			{error && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	z-index: 1;
	gap: 0.3rem;
`;
