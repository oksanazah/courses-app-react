import { Button } from '../../../../common/Button';
import { BUTTON_DELETE_AUTHOR } from '../../../../constants';
import type { Author } from '../../../../helpers';

interface CourseAuthorListParams {
	deleteAuthor: (id: string) => void;
	courseAuthorList: Author[];
}

const CourseAuthorList: React.FC<CourseAuthorListParams> = ({
	deleteAuthor,
	courseAuthorList,
}) => {
	const element: JSX.Element = (
		<ul data-testid='course-authors'>
			{courseAuthorList.map((author: Author) => (
				<li key={author.id} className='author'>
					{author.name}{' '}
					<Button
						buttonText={BUTTON_DELETE_AUTHOR}
						onButtonClick={() => deleteAuthor(author.id)}
					/>
				</li>
			))}
		</ul>
	);

	return (
		<div className='course-authors'>
			<h4>Course authors</h4>
			{courseAuthorList.length === 0 ? <h5>Author list is empty</h5> : element}
		</div>
	);
};

export default CourseAuthorList;
