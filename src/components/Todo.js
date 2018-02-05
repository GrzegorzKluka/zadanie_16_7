import React from 'react';

const Todo = props => (
	<li
		onClick={() => {
			props.remove(props.item.id);
		}}
	>
		{props.item.text}
	</li>
);

export default Todo;
