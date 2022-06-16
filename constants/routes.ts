export const routes = {
	home: '/',
	tvShows: '/?category=tv-shows',
	movies: '/?category=movies',
	new: '/?category=new',
	myList: '#my-list',
	account: '/account',
	signUp: '/signup',
	login: '/login',
	plans: '/plans',
	forgotPassword: '/forgotPassword',
};

export const unProctectedRoutes = [routes.login, routes.signUp, routes.forgotPassword];
export const noSubscriptionRoutes = [...unProctectedRoutes, routes.plans];
