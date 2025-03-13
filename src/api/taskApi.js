import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return { Authorization: `Bearer ${token}` };
};

export const fetchTasks = async (status) => {
  try {
    const endpoint = status ? `${API_BASE_URL}/filter-task/${status}` : `${API_BASE_URL}/tasks`;
    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
    const data = await response.json();
    return data ? data.tasks : [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};


export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
      headers: getAuthHeaders(),
    });
    toast.success("Task deleted successfully!");
    return true;
  } catch {
    toast.error("Failed to delete task!");
    return false;
  }
};

export const updateTask = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedData, {
      headers: getAuthHeaders(),
    });
    toast.success("Task updated successfully!");
    return response.data.task;
  } catch {
    toast.error("Failed to update task!");
    return null;
  }
};

export const markAsComplete = async (id) => {
  try {
    const task = await updateTask(id, { status: "completed" });
    toast.success("Task marked as completed!");
    return task;
  } catch {
    toast.error("Failed to mark task as completed!");
    return null;
  }
};

export const addTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, {
      headers: getAuthHeaders(),
    });
    toast.success("Task added successfully!");
    return response.data.task;
  } catch {
    toast.error("Failed to add task!");
    return null;
  }
};
