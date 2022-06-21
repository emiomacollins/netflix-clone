import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { Movie } from '../constants/home/types';
import { firestore } from '../lib/firebase/firebase';
import { getUser } from '../lib/redux/slices/user/userSlice';

export function useMyList() {
	const user = useSelector(getUser);
	const queryClient = useQueryClient();
	const fetchListQueryKey = [`fetchMyList`, user?.uid];

	const query = useQuery<Movie[] | null>(
		fetchListQueryKey,
		async () => {
			const myListRef = doc(firestore, `myList/${user?.uid}`);
			const snapshot = await getDoc(myListRef);
			return snapshot.data()?.list;
		},
		{
			staleTime: Infinity,
		}
	);

	const toggleMutation = useMutation(
		`toggleFromList-${user?.uid}`,
		async (movie: Movie) => {
			const { data: myList } = query;
			const ref = doc(firestore, `myList/${user?.uid}`);
			const isModalMovie = ({ id }: Movie) => id === movie?.id;
			const isNotModalMovie = ({ id }: Movie) => id !== movie?.id;

			const newList = myList?.find(isModalMovie)
				? myList.filter(isNotModalMovie)
				: [movie, ...(myList || [])];

			await setDoc(ref, {
				list: newList,
			});
		},
		{
			onSuccess() {
				queryClient.invalidateQueries(fetchListQueryKey);
			},
		}
	);

	return {
		query,
		toggleMutation,
	};
}
