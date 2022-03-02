import React from "react";
import { Route, Redirect } from "react-router-dom";

//AUTH related methods
import { getFirebaseBackend } from "../helpers/authUtils";
import { useSelector } from 'react-redux';

const AppRoute = ({
	component: Component,
	layout: Layout,
	isAuthProtected,
	...rest
}) => {
	const token = useSelector(state => state.token.token);
	if (token) {
		isAuthProtected = true;
	}
	return (
		<Route
			{...rest}
			render={props => {
				// console.log("propsloz", props);
				// console.log("tokenloz", token);
				// console.log("isAuthProtected", isAuthProtected);
				if (isAuthProtected && !token) {
					return (
						<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
					);
				}
				return (
					<Layout>
						<Component {...props} />
					</Layout>
				);
			}}
		/>
	);
}
export default AppRoute;

