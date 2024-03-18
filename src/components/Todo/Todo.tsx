import { useCallback, useState } from "react";
import { addTodo, deleteOneTodo, selectAllTodos, updateOneTodo } from "../../features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import './Todo.css'

const Todo = () => {

    const dispatch = useAppDispatch();
    const todos = useAppSelector(selectAllTodos);
    const [todo, setTodo] = useState("");
    const [count,setCount] = useState(1);
    const [oldCount,setOldCount] = useState(0);

    const updateTodo = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(event.target.value);
    }, [todo]);

    const submitTodo = useCallback((event: any) => {
        event?.preventDefault();
        setCount(count+1);
        const newTodo = { id: count, todo: todo }
        dispatch(addTodo(newTodo));
    }, [todo,count]);

    const editTodo = useCallback((editTodo:any)=>{
        setTodo(editTodo.todo);
        setOldCount(parseInt(editTodo.id));
    },[todo,oldCount]);

    const updateOnce = useCallback(()=>{
        const update = { id: oldCount, todo };
        console.log('update',update);
        dispatch(updateOneTodo(update))
    },[oldCount,todo]);

    const DeleteOnce = useCallback((deleteValue:any)=>{
        dispatch(deleteOneTodo(deleteValue.id))
    },[])


    return (<><form onSubmit={submitTodo}><input type="text" className="Todo" placeholder="Todo" onChange={updateTodo} value={todo}></input>
        <button type="submit">+</button></form>
        <table>
            <thead><tr><td>Index</td><td>Name</td><td>Edit</td><td>Delete</td></tr></thead>
            <tbody>{todos.map((todo,Index) => (
            <tr key={todo.id}><td>{Index+1}</td><td><a href="#" onClick={()=>editTodo(todo)}>{todo.todo}</a></td><td><a href="#" onClick={updateOnce} className="action_link">Update</a></td><td><a href="#" className="action_link" onClick={()=>DeleteOnce(todo)}>Delete</a></td></tr>
        ))}</tbody>
        </table>
    </>)
}

export default Todo;
