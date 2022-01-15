import {useState,useEffect} from 'react'

function App() {
  const [todos,setTodos]= useState([])
  const [todo,setTodo]= useState('')
  const[editing,setEditing]=useState(null)
  const[editingtext,setEditingtext]=useState("")
  
  useEffect(()=>{
    const temp=localStorage.getItem('todos')
    const loadedtodos=JSON.parse(temp)
    if(loadedtodos){
      setTodos(loadedtodos);
    }
  },[])
  useEffect(()=>{
    const temp=JSON.stringify(todos)
    localStorage.setItem('todos',temp)
  },[todos])
  const handleSubmit=(e)=>{
    e.preventDefault();
    const newTodo={
      id: new Date().getTime(),
      text:todo,
      completed: false
    }
    setTodos([...todos].concat(newTodo));
    setTodo("");
    }

  const deleteTodo=(id)=>{
    const updatedTodos= [...todos].filter((todo) => todo.id !==id); 
    setTodos(updatedTodos);
  }
  const editTodo=(id)=>{
    const updatedTodos= [...todos].map((todo) =>{
        if(todo.id===id){
          todo.text=editingtext;
        }
        return todo;
    })
    setTodos(updatedTodos);
    setEditing(null);
    setEditingtext('');
  }
  const toggleComplete=(id)=>{
    const updatedTodos=[...todos].map((todo)=>{
      if(todo.id===id){
        todo.completed=!todo.completed;
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  return (
    <div className="app">
      <h3>Things To Do</h3>
      <form className='todo-form' onSubmit={handleSubmit}>
        <input placeholder='Add a new task' type='text' onChange={(e)=> setTodo(e.target.value)} value={todo}/>
        <button className='btn1' type='submit'>Add</button>
      </form>
      {todos.map((todo)=><div key={todo.id} className='todo-list'>
        {editing===todo.id? (<input type='text' onChange={(e)=>setEditingtext(e.target.value)} value={editingtext}/>)
        :(<div>{todo.text}</div>)}        
        <button className='btn2' onClick={()=>deleteTodo(todo.id)}>delete</button> 
        <input type='checkbox' onChange={()=>toggleComplete(todo.id)} checked={todo.completed}/>
        {editing===todo.id?(<button className='btn2' onClick={()=>editTodo(todo.id)} >submit edits</button>)
        :( <button className='btn2' onClick={()=>setEditing(todo.id)} >edit</button>)}
        </div>)}
    </div>
  );
}

export default App;
