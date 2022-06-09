import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ProgressBar() {
	const [progress, setprogress] = useState(0);

	const updateProgress = () => {
		setprogress((progress) => (progress + 5 <= 100 ? progress + 5 : 100));
	};

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		Router.events.on('routeChangeStart', () => {
			setprogress(10);
			interval = setInterval(updateProgress, 1000);
		});
		Router.events.on('routeChangeComplete', () => {
			setprogress(0);
			clearInterval(interval);
		});
	}, []);

	return (
		<Container>
			<Bar progress={progress} />
		</Container>
	);
}

interface Props {
	progress: number;
}

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 0.3rem;
	z-index: 100;
`;

const Bar = styled.div<Props>`
	background: var(--red);
	width: ${(p) => p.progress}%;
	height: 100%;
	transition: 0.2s;
`;
