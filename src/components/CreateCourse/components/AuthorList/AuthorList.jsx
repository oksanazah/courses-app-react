import { Button } from '../../../../common/Button';
import { BUTTON_ADD_AUTHOR } from '../../../../constants';

function AuthorList({ addAuthor, authorList }) {
	const element = (
		<ul>
			{authorList.map((author) => {
				return (
					<li key={author.id} className='author'>
						{author.name}{' '}
						<Button
							buttonText={BUTTON_ADD_AUTHOR}
							onButtonClick={() => addAuthor(author.id)}
						/>
					</li>
				);
			})}
		</ul>
	);

	return (
		<div className='all-authors'>
			<h4>Authors</h4>
			{authorList.length === 0 ? <h5>Author list is empty</h5> : element}
		</div>
	);
}

export default AuthorList;
