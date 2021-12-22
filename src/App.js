import "./App.scss";
import { useState } from "react";

function App() {
  const [TaskList, setTaskList] = useState([]);
  const [Task, setTask] = useState("");
  const [isEditable, setisEditable] = useState(false);
  const [EditedTask, setEditedTask] = useState("");

  const InputHandler = (e) => {
    setTask(e.target.value);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (Task.length == 0) window.alert("Empty Task");
    else {
      setTaskList([...TaskList, Task]);
      setTask("");
    }
  };

  const DeleteTask = (index) => {
    setTaskList(TaskList.filter((task, taskIndex) => taskIndex != index));
  };

  const EditTask = (task) => {
    setisEditable(!isEditable);
    setEditedTask(task);
  };

  const EditHandler = (e) => {
    setEditedTask(e.target.value);
  };

  const UpdateTask = (index) => {};

  return (
    <section>
      <div className="add-task">
        <h1>Add a task</h1>
        <form>
          <input type="text" onChange={InputHandler} value={Task}></input>
          <button onClick={SubmitHandler}>Add Task</button>
        </form>
      </div>

      <div className="task-list">
        <h1>Tasks</h1>
        {!TaskList.length ? (
          <div className="no-task">No Tasks</div>
        ) : (
          TaskList.map((task, index) => {
            return (
              <div className="task" key={index}>
                {!isEditable ? (
                  <div className="task-title">{task}</div>
                ) : (
                  <input
                    type="text"
                    value={EditedTask}
                    onChange={EditHandler}
                  ></input>
                )}

                {!isEditable ? (
                  <>
                    <button className="edit" onClick={() => EditTask(task)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => DeleteTask(index)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button className="update" onClick={UpdateTask(index)}>
                      Update
                    </button>
                    <button
                      className="cancel"
                      onClick={() => setisEditable(!isEditable)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default App;
