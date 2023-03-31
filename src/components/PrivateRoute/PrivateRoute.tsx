import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUser } from '../../store';

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
}): JSX.Element => {
	const { role } = useSelector(selectUser);

	if (role === 'admin') {
		return <>{children}</>;
	} else {
		return <Navigate to={'/courses'} />;
	}
};

export default PrivateRoute;
