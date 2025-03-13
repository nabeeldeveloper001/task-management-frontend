const Navbar = ({ setModalOpen, handleLogout, setStatus }) => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Task Manager</h1>

      <div className="flex items-center space-x-4">
        {/* Status Filter Dropdown */}
        <select
          className="p-2 bg-white text-black rounded"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <button onClick={() => setModalOpen(true)} className="bg-green-500 px-4 py-2 rounded">
          Add Task
        </button>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
