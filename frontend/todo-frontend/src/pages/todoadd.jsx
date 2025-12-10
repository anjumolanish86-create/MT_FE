import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, createTodo } from "../../api/api";

const AddTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    // Fetch users
    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const res = await getUsers();
                // Check if response data is array or wrapped
                setUsers(Array.isArray(res.data) ? res.data : res.data.results || []);
            } catch (err) {
                console.error("Error fetching users", err);
                alert("Error fetching users");
            }
        };
        fetchUsersData();
    }, []);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createTodo({
                title: title,
                description: description,
                status: status,
                userid: Number(userId)
            });

            alert("Todo List Added Successfully");
            navigate("/todo");

        } catch (error) {
            console.log("Error response:", error.response?.data);
            alert("Error adding Todo List");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Add Todo List</h2>

                        <form onSubmit={handleSubmit}>

                            {/* Title */}
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            {/* status */}
                            <div className="mb-3">
                                <label className="form-label">status</label>
                                <select
                                    className="form-control"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            {/* User */}
                            <div className="mb-3">
                                <label className="form-label">User</label>
                                <select
                                    className="form-control"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <button type="submit" className="btn btn-primary w-100">
                                Add Todo List
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTodo;
