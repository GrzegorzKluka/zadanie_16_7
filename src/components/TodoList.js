import React from 'react';
import style from './TodoList.css';

const TodoList = props => (
	<ul className={style.TodoList}>
		{props.data.map((item, remove) => (
			<li
				key={item.id}
				onClick={() => {
					props.remove(item.id);
				}}
			>
				{item.text}
			</li>
		))}
	</ul>
);

export default TodoList;
