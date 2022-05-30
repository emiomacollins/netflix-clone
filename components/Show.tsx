import { Fragment, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Breakpoints } from '../constants/breakpoints';

interface Props {
	on: Breakpoints;
	children: ReactNode;
}

function Show({ on, children }: Props) {
	const show = useMediaQuery({ query: on });
	return <Fragment>{show ? children : null}</Fragment>;
}

export default Show;
