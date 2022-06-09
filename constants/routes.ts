export const routes = {
	home: '/',
	tvShows: '/?category=tv-shows',
	movies: '/?category=movies',
	new: '/?category=new',
	myList: '/myList',
	account: '/account',
	signUp: '/signup',
	login: '/login',
};

export const unProctectedRoutes = [routes.login, routes.signUp];
