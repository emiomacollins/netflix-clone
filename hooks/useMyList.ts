import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { Movie } from '../constants/home/types';
import { firestore } from '../lib/firebase/firebase';
import { getUser } from '../lib/redux/slices/user/userSlice';

export function useMyList() {
	const user = useSelector(getUser);
	const queryClient = useQueryClient();

	const query = useQuery<Movie[]>(`fetchMyList-${user?.uid}`, async () => {
		const myListRef = doc(firestore, `myList/${user?.uid}`);
		const snapshot = await getDoc(myListRef);
		return snapshot.data()?.list;
	});

	const toggleMutation = useMutation(
		`toggleFromList-${user?.uid}`,
		async (modalMovie: Movie | null) => {
			const myList = query.data;
			const ref = doc(firestore, `myList/${user?.uid}`);
			const index = myList?.findIndex(({ id }) => id === modalMovie?.id) ?? -1;
			await setDoc(ref, {
				list:
					index >= 0
						? myList?.filter((_, i) => i !== index)
						: [...(myList || []), modalMovie],
			});
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(`fetchMyList-${user?.uid}`);
			},
		}
	);

	return {
		query,
		toggleMutation,
	};
}
