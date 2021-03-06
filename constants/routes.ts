export const routes = {
	home: '/',
	tvShows: '/?category=tv',
	movies: '/?category=movie',
	new: '/?category=new',
	myList: '#my-list',
	account: '/account',
	signUp: '/signup',
	login: '/login',
	plans: '/plans',
	forgotPassword: '/forgotPassword',
	changePassword: '/changePassword',
	search: '/search',
};

export const unProctectedRoutes = [routes.login, routes.signUp, routes.forgotPassword];
export const noSubscriptionRoutes = [...unProctectedRoutes, routes.plans];
