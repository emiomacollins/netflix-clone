import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface Props extends ImageProps {
	className?: string;
	delay?: number;
}

export default function ImageLoader({ className, delay, ...imageProps }: Props) {
	const [loading, setLoading] = useState(true);
	const loadingProp = loading ? 'true' : undefined;

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 5000);
	}, []);

	function handleUpdateLoad() {
		setLoading(true);
	}

	return (
		<Container className={className} loading={loadingProp} delay={delay}>
			<Image {...imageProps} alt='' layout='fill' onLoad={handleUpdateLoad} />
		</Container>
	);
}

interface ContainerProps {
	loading: string | undefined;
	delay?: number;
}

const Container = styled.div<ContainerProps>`
	background: var(--black);
	position: relative;

	img {
		object-fit: cover;
		object-position: top;
	}

	${(p) =>
		p.loading &&
		css`
			animation: skeleton-loading 1s linear infinite alternate
				${p.delay ? p.delay + 's' : ''};
		`};

	@keyframes skeleton-loading {
		0% {
			background: var(--gray-dark);
		}
		100% {
			background: var(--black);
		}
	}
`;
