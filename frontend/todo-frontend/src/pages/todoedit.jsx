import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

function EditTodo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState([]);


    //Load specific employee
    const fetchTodo = async () => {
        try {
            const res = await api.get(`todo/${id}/`)
            const todo = res.data;
            setTitle(todo.title);
            setDescription(todo.description);
            setStatus(todo.status);
            setUserId(todo.userid); // Fixed: backend key is userid
        } catch (err) {
            console.error("error loading Todo:", err);
            alert("Failed to load Todo")
        }
    };

    //Fetch users
    const fetchUsers = async () => {
        try {
            const res = await api.get("users/");
            // We use api.get directly here or import getUsers from api.js. 
            // efficient way: import { getUsers } from ...
            // But since api is default imported as 'api', we can use api.get('users/')
            setUsers(Array.isArray(res.data) ? res.data : res.data.results || []);
        } catch (err) {
            console.error("error loading users:", err);
        }
    };

    useEffect(() => {
        fetchTodo();
        fetchUsers();
    }, []);

    //Update employee
    const handleUpdate = async (e) => {
        e.preventDefault();

        const payload = {
            title: title,
            description: description,
            status: status,
            userid: Number(userId),
        };

        try {
            await api.put(`todo/${id}/`, payload);
            alert("Todo updated");
            navigate("/todo");
        } catch (err) {
            console.error("update error:", err.response?.data);
            alert(JSON.stringify(err.response?.data));
        }
    };

    return (
        <div className="container mt-5">
            <h3>Edit Todo</h3>
            <form onSubmit={handleUpdate} className="mt-3">
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />

                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <input type="text" className="form-control" value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />

                </div>

                <div className="mb-3">
                    <label>Status</label>
                    <select className="form-control" value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required>
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>User</label>
                    <select className="form-control" value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required>
                        <option value="">Select User</option>
                        {users.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.username}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Todo List</button>
            </form>
        </div>
    );
}
export default EditTodo;