import { doc, getDoc, setDoc } from 'firebase/firestore';
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';
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

	function toggleFromList(list: Movie[] | null | undefined, movie: Movie) {
		const isModalMovie = ({ id }: Movie) => id === movie?.id;
		const isNotModalMovie = ({ id }: Movie) => id !== movie?.id;

		const newList = list?.find(isModalMovie)
			? list.filter(isNotModalMovie)
			: [movie, ...(list || [])];

		return newList;
	}

	const toggleMutation = useMutation(
		`toggleFromList-${user?.uid}`,
		async (modalMovie: Movie) => {
			const { data: myList } = query;
			const ref = doc(firestore, `myList/${user?.uid}`);
			await setDoc(ref, {
				list: toggleFromList(myList, modalMovie),
			});
		},
		{
			onMutate(modalMovie: Movie) {
				const prevListQuery = queryClient.getQueriesData(fetchListQueryKey)[0];
				const [_, prevList] = (prevListQuery || []) as [QueryKey, Movie[]];
				queryClient.setQueriesData(
					fetchListQueryKey,
					toggleFromList(prevList, modalMovie)
				);
				return { prevList };
			},
			onError(_, __, context) {
				queryClient.setQueriesData(fetchListQueryKey, {
					prevList: context?.prevList,
				});
			},
			onSettled() {
				// sync with server regardless of the outcome
				queryClient.invalidateQueries(fetchListQueryKey);
			},
		}
	);

	return {
		query,
		toggleMutation,
	};
}
