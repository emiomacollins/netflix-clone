import { useEffect, useRef, useState } from 'react';

export function useToggle(initial = false) {
	const [state, setState] = useState(initial);
	const ref = useRef<any>(null);

	useEffect(() => {
		// very important
		// next time create separate hook `useDropdown` which makes use of this hook `useToggle` and adds ref functionality
		if (!ref.current) return;

		function onClick(e: MouseEvent) {
			if (ref.current?.contains(e.target)) return;
			setState(false);
		}
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, []);

	return {
		state,
		setState,
		ref,
		toggle() {
			setState((state) => !state);
		},
	};
}
