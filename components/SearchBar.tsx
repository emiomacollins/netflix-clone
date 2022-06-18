import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Breakpoints } from '../constants/breakpoints';
import { routes } from '../constants/routes';
import { useToggle } from '../hooks/useToggle';
import Button from './styled components/Button';

export default function SearchBar() {
	const router = useRouter();
	const initialSearchQuery = router.query.searchQuery;
	const inputRef = useRef<HTMLInputElement | any>();
	const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
	const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
	const {
		state: focused,
		setState: setFocused,
		ref,
	} = useToggle(initialSearchQuery ? true : false);

	function openSearchBox() {
		if (!focused) setFocused(true);
	}

	useEffect(() => {
		focused && inputRef.current?.focus();
	}, [focused]);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const query = e.target.value;
		setSearchQuery(query);
		timer && clearTimeout(timer);
		setTimer(
			query
				? setTimeout(() => {
						router.push(`${routes.search}?searchQuery=${query}`);
				  }, 500)
				: setTimeout(() => {
						// if no query wait 5 seconds and go to homePage
						router.push(routes.home);
				  }, 5000)
		);
	}

	return (
		<Container ref={ref} focused={focused}>
			<Input
				type='text'
				ref={inputRef}
				onChange={handleChange}
				value={searchQuery}
			/>
			<SearchBtn color='transparent' onClick={openSearchBox}>
				<StyledSearchIcon />
			</SearchBtn>
		</Container>
	);
}

interface FocusedProps {
	focused: boolean;
}

const Container = styled.div<FocusedProps>`
	display: flex;
	align-items: center;
	border: 1px solid transparent;
	padding: 0.1em 0.25em 0.1em 0.5em;
	transition: all 0.2s;
	gap: 1rem;
	border-radius: var(--radius-200);

	${(p) =>
		p.focused &&
		css`
			border-color: var(--light);

			${Input} {
				width: 80px;
				margin-bottom: 0.1em;

				@media ${Breakpoints.tabletUp} {
					width: 150px;
				}
			}

			${SearchBtn} {
			}

			${StyledSearchIcon} {
			}
		`}
`;

const SearchBtn = styled(Button)`
	display: flex;
	padding: 0;
`;

const StyledSearchIcon = styled(SearchIcon)`
	aspect-ratio: 1;
	position: relative;
	height: var(--size-700);

	@media ${Breakpoints.tabletUp} {
		height: var(--size-600);
	}
`;

const Input = styled.input`
	min-width: 0;
	width: 0;
	border: 0;
	background: transparent;
	outline: 0;
	transition: width 0.2s;
	color: var(--light);

	&::placeholder {
		font-size: inherit;
		color: var(--light);
		opacity: 0.8;
	}
`;
