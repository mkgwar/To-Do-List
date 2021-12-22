import "./App.scss";
import { useState } from "react";

function App() {
  const [TaskList, setTaskList] = useState([]);
  const [Task, setTask] = useState("");
  const [isEditable, setisEditable] = useState(false);
  const [EditedTask, setEditedTask] = useState("");
  const [EditedIndex, setEditedIndex] = useState(-1);

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

  const EditTask = (task, index) => {
    setisEditable(!isEditable);
    setEditedTask(task);
    setEditedIndex(index);
  };

  const EditHandler = (e) => {
    setEditedTask(e.target.value);
  };

  const UpdateTask = (index) => {
    setTaskList(
      TaskList.map((task, taskIndex) => {
        if (taskIndex == index) return EditedTask;
        else return task;
      })
    );

    setisEditable(!isEditable);
    setEditedIndex(-1);
  };

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
                {isEditable && index == EditedIndex ? (
                  <input
                    type="text"
                    value={EditedTask}
                    onChange={EditHandler}
                  ></input>
                ) : (
                  <div className="task-title">{task}</div>
                )}

                {isEditable && index == EditedIndex ? (
                  <>
                    <button
                      className="update"
                      onClick={() => UpdateTask(index)}
                    >
                      Update
                    </button>
                    <button
                      className="cancel"
                      onClick={() => setisEditable(!isEditable)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit"
                      onClick={() => EditTask(task, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => DeleteTask(index)}
                    >
                      Delete
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
