import { Navigate, useLoaderData } from 'react-router-dom';

import { UserResponse } from '../../helpers';

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
}): JSX.Element => {
	const data = useLoaderData() as UserResponse;
	const role = data.result.role;

	if (role === 'admin') {
		return <>{children}</>;
	} else {
		return <Navigate to={'/courses'} />;
	}
};

export default PrivateRoute;
