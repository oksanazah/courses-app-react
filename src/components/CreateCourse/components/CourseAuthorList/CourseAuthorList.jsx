import { Button } from '../../../../common/Button';
import { BUTTON_DELETE_AUTHOR } from '../../../../constants';

function CourseAuthorList({ deleteAuthor, courseAuthorList }) {
	const element = (
		<ul>
			{courseAuthorList.map((author) => (
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
}

export default CourseAuthorList;
