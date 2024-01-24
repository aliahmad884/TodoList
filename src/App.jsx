import './App.css';
import './mediaQ.css';
import { useRef, useState } from 'react';
import MyComponent from './temp';


export default function App() {
  let counter = 0;
  const [task, updateTask] = useState(
    [
      new taskHandler(++counter, 'Task one', "2024-01-03"),
      new taskHandler(++counter, 'Task tow', "2024-01-10"),
      new taskHandler(++counter, 'Task three', "2024-01-05")
    ]
  );
  const [taskText, setTaskText] = useState('');
  const [taskDate, setTaskDate] = useState();
  const [editText, setEditText] = useState('');
  const [editDate, setEditDate] = useState('');
  const [taskTextContent, setTaskTextContent] = useState();
  const [close, setClose] = useState();

  const inputRef = useRef(null);

  const TaskComplete = (e) => {
    let eltInput = e.childNodes[2];
    let eltDate = e.childNodes[4];
    eltDate.classList.toggle("completed");
    eltInput.classList.toggle("completed");
    let eltText = e.childNodes[3];
    eltText.classList.toggle("completedText")
    if (eltText.textContent == "Pending") {
      eltText.innerText = "Completed"
    } else if (eltText.textContent == "Completed") {
      eltText.innerText = "Pending";
    }
  }
  const DeleteTask = (id) => {
    // let found = task.filter(f => f.Id !== id);
    // updateTask(found);
    let found = task.findIndex(f => f.Id == id);
    task.splice(found, 1);
    updateTask([...task]);
  }

  const AddNewTask = () => {
    task.push(new taskHandler(task.length + 1, taskText, taskDate));
    updateTask([...task]);
    setTaskText('');
  }
  const Discard = () => {
    setTaskText('');
  }

  const showInput = () => {
    let temp = document.querySelector(".newTask");
    temp.classList.toggle("show");
    inputRef.current.focus();
  }

  const editTask = (e) => {
    let elt = e.childNodes[2];
    setClose(e);
    let eltDate = e.childNodes[4].childNodes[0];
    let eltDateInput = e.childNodes[4].childNodes[1];
    console.log(eltDate)
    let eltCheck = e.childNodes[1].childNodes[0];
    let text = elt.childNodes[0];
    setTaskTextContent(text.textContent);

    let edit = elt.childNodes[1];
    eltDate.classList.toggle('none');
    text.classList.toggle('none');
    eltCheck.classList.toggle('none');
    edit.classList.toggle("showContainer");
    eltDateInput.classList.toggle("showContainer");

  }

  const saveTask = () => {
    let elt = close.childNodes[2];
    let eltCheck = close.childNodes[1].childNodes[0];
    let text = elt.childNodes[0];
    let eltDate = close.childNodes[4].childNodes[0];
    let eltDateInput = close.childNodes[4].childNodes[1];

    let edit = elt.childNodes[1];
    eltDate.classList.toggle('none');
    text.classList.toggle('none');
    eltCheck.classList.toggle('none');
    edit.classList.toggle("showContainer");
    eltDateInput.classList.toggle("showContainer");


    let found = task.findIndex(t => t.Task === taskTextContent);
    // console.log(found)
    const newArray = task.map((item, i) => (i === found ? { ...item, Task: editText, TaskDate:editDate } : item));
    updateTask(newArray);
  }
  return (
    <>
      <div className='mainContainer'>

        <div className='outer'>
          <header>
            <img src='Images/todoIcon.png' className="App-logo" alt="logo" />
            <div>
              <h2>TODO</h2>
              <p>A Simple Daily Task Organizer.</p>
            </div>
          </header>

          <main>

            <div className='taskArea'>
              {/* -=============== Task Section ===============- */}
              <table>
                <thead>
                  <tr>
                    <th >Index</th>
                    <th colSpan={2} style={{ textAlign: 'left', paddingLeft: '30px' }}>Task</th>
                    <th style={{ textAlign: 'left' }}>Status</th>
                    <th >To be held</th>
                    <th >Controls</th>
                  </tr>
                  <tr>
                    <td colSpan={6}>
                      <hr />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {task.map(t => <tr key={t.Id}>
                    <td >{t.Id}</td>
                    <td><input onClick={(e) => TaskComplete(e.target.parentElement.parentElement)} style={{ cursor: 'pointer' }} type="checkbox" /></td>
                    <td style={{ textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
                      <p>{t.Task}</p>
                      <div className='editContainer'>
                        <button onClick={() => {
                          saveTask()
                        }} type="button" className='btnEditSave'>Save</button>
                        <input type="text" defaultValue={t.Task} onChange={(e) => setEditText(e.target.value)} className='editInput' />
                      </div>
                    </td>
                    <td style={{ textAlign: 'left' }} className='statusText'>Pending</td>
                    <td >
                      <p>{t.TaskDate}</p>
                      <input type="date" defaultValue={t.TaskDate} onChange={(e) => setEditDate(e.target.value)} className='editDateInput' />
                    </td>
                    <td >
                      <i onClick={(e) => editTask(e.target.parentElement.parentElement)} className="fa-solid fa-pen fa-xl btnSave"></i>
                      <i onClick={() => DeleteTask(t.Id)} className="fa-solid fa-trash-can fa-xl btnDiscard"></i>
                    </td>
                  </tr>)}
                </tbody>
              </table>

              {/* -=============== Task Section ===============- */}

              {/* ---======== New Task Container ===========--- */}
              <div className='newTask'>
                <div className='newTaskContainer'>
                  <input value={taskText} className='taskInput' onChange={(e) => setTaskText(e.target.value)} ref={inputRef} type="text" />
                  <input onChange={(e) => setTaskDate(e.target.value)} type="date" />
                  <button className='btnSave' onClick={() => {
                    AddNewTask()
                    showInput()
                  }} type='button '>Save</button>
                  <button className='btnDiscard' onClick={() => {
                    showInput()
                    Discard()
                  }} type='button'>Discard</button>
                </div>
              </div>
              {/*--=============== End ==============-- */}

            </div>

            <div className='addBtnContainer'>
              <button className='addBtn' onClick={() => showInput()} type='button'>Add New Task</button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}


export class taskHandler {
  constructor(id, task, date) {
    this.Id = id;
    this.Task = task;
    this.TaskDate = date;
  }
}
