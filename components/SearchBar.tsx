import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
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
			setTimeout(() => {
				router.push(`${routes.search}?searchQuery=${query}`);
			}, 500)
		);
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		inputRef.current.blur();
	}

	return (
		<Container ref={ref} focused={focused} onSubmit={handleSubmit}>
			<Input
				type='text'
				ref={inputRef}
				onChange={handleChange}
				value={searchQuery}
			/>
			<SearchBtn type='button' color='transparent' onClick={openSearchBox}>
				<StyledSearchIcon />
			</SearchBtn>
		</Container>
	);
}

interface FocusedProps {
	focused: boolean;
}

const Container = styled.form<FocusedProps>`
	display: flex;
	align-items: center;
	gap: 1rem;

	padding: 0.1em 0.25em 0.1em 0.5em;
	border: 2px solid transparent;
	border-radius: var(--radius-200);
	transition: 0.2s;

	${(p) =>
		p.focused &&
		css`
			border-color: var(--light);

			${Input} {
				width: 150px;
				margin-bottom: 0.1em;

				@media ${Breakpoints.mobileDown} {
					width: 80px;
				}
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
	color: var(--light);
	transition: 0.2s;

	&::placeholder {
		font-size: inherit;
		color: var(--light);
		opacity: 0.8;
	}
`;
