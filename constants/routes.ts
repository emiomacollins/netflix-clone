export const routes = {
	home: '/',
	tvShows: '/?category=tv-shows',
	movies: '/?category=movies',
	new: '/?category=new',
	myList: '/myList',
	account: '/account',
	signUp: '/signup',
	login: '/login',
	plans: '/plans',
};

export const unProctectedRoutes = [routes.login, routes.signUp];
export const noSubscriptionRoutes = [...unProctectedRoutes, routes.plans];
