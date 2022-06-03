import styled from 'styled-components';
import { CategoryType } from '../../pages/types';

export default function Category({ heading, movies }: CategoryType) {
	return (
		<Container>
			<Heading>{heading}</Heading>
		</Container>
	);
}

const Container = styled.div``;

const Heading = styled.h2`
	font-weight: 500;
`;
