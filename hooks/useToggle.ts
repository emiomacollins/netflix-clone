import { useState } from 'react';

export function useToggle(initial = false) {
	const [state, setState] = useState(initial);

	return {
		state,
		setState,
		toggle() {
			setState((state) => !state);
		},
	};
}
