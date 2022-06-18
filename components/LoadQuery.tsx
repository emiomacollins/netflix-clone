import { ReactNode } from 'react';
import { UseQueryResult } from 'react-query';
import styled from 'styled-components';
import Spinner from './styled components/Spinner';

interface Props {
	query: UseQueryResult;
	children: (data: any) => ReactNode;
}

export default function LoadQuery({ query, children }: Props) {
	const { isLoading, data } = query;

	return <Container>{isLoading ? <Spinner /> : children(data)}</Container>;
}

const Container = styled.div`
	justify-self: center;
	align-self: center;
`;
