import { CSSProperties } from 'react';
import styled from 'styled-components';

interface Props {
	styles?: CSSProperties;
}

function Spinner({ styles }: Props) {
	return (
		<Container>
			<Icon style={styles} />
		</Container>
	);
}

export default Spinner;

const Container = styled.div`
	display: grid;
	place-content: center;
`;

const Icon = styled.div`
	height: 1.5em;
	aspect-ratio: 1;
	border-radius: 50%;
	border-top: 2px solid var(--white);
	border-right: 2px solid transparent;
	animation: spin 1s linear infinite;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;
