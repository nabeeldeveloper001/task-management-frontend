import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";
import { fetchTasks, deleteTask, updateTask, addTask } from "../api/taskApi";
import { toast, ToastContainer } from "react-toastify";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks(status);
  }, [status]);

  const loadTasks = async (status = "") => {
    setLoading(true);
    const data = await fetchTasks(status);
    setTasks(data);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    toast.success("Logout successful!");
  };

  const handleDeleteTask = async (id) => {
    const success = await deleteTask(id);
    if (success) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    const updatedTask = await updateTask(id, updatedData);
    if (updatedTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    }
  };

  const handleMarkAsComplete = async (id) => {
    await handleUpdateTask(id, { status: "completed" });
  };

  const handleSaveTask = async (taskData) => {
    if (editTask) {
      await handleUpdateTask(editTask._id, taskData);
    } else {
      const newTask = await addTask(taskData);
      if (newTask) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    }
    setModalOpen(false);
    setEditTask(null);
  };

  return (
    <div className="p-6">
      <ToastContainer />
      
      <Navbar setModalOpen={setModalOpen} handleLogout={handleLogout} setStatus={setStatus} />

      <div className="bg-white shadow-md rounded">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="p-2">#</th>
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-6">
                  <div className="flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6">
                  <span className="text-gray-600 font-bold">No tasks found.</span>
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr key={task._id} className="border-b text-center">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">{task.description}</td>
                  <td className="p-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.status === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-2 flex justify-center space-x-2">
                    {task.status !== "completed" && (
                      <button
                        onClick={() => handleMarkAsComplete(task._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditTask(task);
                        setModalOpen(true);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditTask(null);
        }}
        onSave={handleSaveTask}
        initialData={editTask}
      />
    </div>
  );
};

export default Tasks;
