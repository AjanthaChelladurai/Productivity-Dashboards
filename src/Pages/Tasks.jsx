import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaEdit, FaTrash } from "react-icons/fa";

// REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, updateTask, updateStatus } from "../redux/tasksSlice";

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) =>
    Array.isArray(state.tasks.tasks) ? state.tasks.tasks : []
  );

  // LOCAL UI STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);

  // PRIORITY COLORS
  const getPriorityBg = (p) => {
    if (p === "High") return "bg-red-300";
    if (p === "Medium") return "bg-yellow-200";
    return "bg-green-300";
  };

  // ADD TASK
  const handleAddTask = () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    dispatch(
      addTask({
        id: Date.now().toString(),
        title,
        description,
        priority,
        dueDate,
        status: "Pending",
      })
    );

    // RESET INPUTS
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
  };

  // DELETE
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  // OPEN EDIT
  const openEditModal = (task) => {
    setEditTaskData(task);
    setIsEditOpen(true);
  };

  // UPDATE TASK
  const handleUpdate = () => {
    dispatch(updateTask(editTaskData));
    setIsEditOpen(false);
  };

  // DRAG & DROP
  const onDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(
      updateStatus({
        id: result.draggableId,
        status: result.destination.droppableId,
      })
    );
  };

  // RENDER COLUMN
  const renderColumn = (status, label) => (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gradient-to-b from-sky-200 to-white p-4 rounded-xl min-h-[450px]"
        >
          <h2 className="text-lg font-bold text-blue-800 mb-4">{label}</h2>

          {tasks
            .filter((t) => t.status === status)
            .map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 mb-4 rounded-xl shadow relative ${getPriorityBg(
                      task.priority
                    )}`}
                  >
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-sm mt-1">
                      <b>Priority:</b> {task.priority}
                    </p>
                    <p className="text-sm">
                      <b>Due:</b> {task.dueDate || "Not set"}
                    </p>

                    {/* EDIT / DELETE BUTTONS */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button onClick={() => openEditModal(task)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(task.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <div className="bg-white min-h-screen">
      <main className="pt-16 md:ml-8 p-6 max-w-6xl mx-auto">
        {/* MOBILE ALERT */}
        <div className="md:hidden mb-4">
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg text-sm">
            ⚠️ For a better experience, please use <b>Desktop site</b>.
          </div>
        </div>

        {/* ADD TASK */}
        <div className="bg-gradient-to-b from-blue-200 to-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Your To-Dos → Get It Done Soon
          </h2>

          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 border rounded-lg px-4 py-3 text-lg"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full mb-4 border rounded-lg px-4 py-3"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Due date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <button
              onClick={handleAddTask}
              className="sidebar-btn md:col-span-1 text-center w-full"
            >
              + New
            </button>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 mb-4 rounded-xl shadow relative ${getPriorityBg(
                task.priority
              )}`}
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm">{task.description}</p>
              <p className="text-sm mt-1">
                {task.priority} | {task.status}
              </p>
              <div className="flex justify-end gap-2 mt-3">
                <button onClick={() => openEditModal(task)}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(task.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid md:grid-cols-3 gap-6">
              {renderColumn("Pending", "Pending")}
              {renderColumn("In Progress", "In Progress")}
              {renderColumn("Completed", "Completed")}
            </div>
          </DragDropContext>
        </div>
      </main>

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4 text-blue-800">
              Edit Task
            </h2>

            <input
              value={editTaskData.title}
              onChange={(e) =>
                setEditTaskData({ ...editTaskData, title: e.target.value })
              }
              className="w-full mb-3 border rounded-lg px-3 py-2"
            />

            <textarea
              value={editTaskData.description}
              onChange={(e) =>
                setEditTaskData({
                  ...editTaskData,
                  description: e.target.value,
                })
              }
              className="w-full mb-3 border rounded-lg px-3 py-2"
              rows={3}
            />

            <select
              value={editTaskData.priority}
              onChange={(e) =>
                setEditTaskData({
                  ...editTaskData,
                  priority: e.target.value,
                })
              }
              className="w-full mb-3 border rounded-lg px-3 py-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={editTaskData.dueDate}
              onChange={(e) =>
                setEditTaskData({ ...editTaskData, dueDate: e.target.value })
              }
              className="w-full mb-4 border rounded-lg px-3 py-2"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button onClick={handleUpdate} className="sidebar-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
