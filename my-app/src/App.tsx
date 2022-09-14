import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TodoListsType={
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1=v1();
    let todolistID2=v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistID:string, taskID: string) {
       setTasks({...tasks, [todolistID]:tasks[todolistID].filter(el=>el.id!==taskID)})
    }

    function addTask(todolistID:string,title: string) {
        let newTasks = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]:[newTasks, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID:string, taskId: string, newIsDone: boolean) {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(el=>el.id===taskId?{...el, isDone:newIsDone }:el)})
    }


    function changeFilter(todolistID:string, filterValue: FilterValuesType) {
       setTodoLists(todoLists.map(el=>el.id===todolistID?{...el, filter:filterValue}:el))
    }
    const removeTodoList=(todolistID:string)=>{
        setTodoLists(todoLists.filter(el=>el.id!==todolistID))
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            {todoLists.map(el=> {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }
                return (
                    <Todolist
                              key={el.id}
                              todolistID={el.id}
                              title={el.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={el.filter}
                              removeTodoList={removeTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;
