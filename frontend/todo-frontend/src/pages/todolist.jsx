import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";
import { deleteTodo } from "../../api/api";

const TodoList = () => {
    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchTodo();
        }, 300); // Debounce 300ms

        return () => clearTimeout(delayDebounce);
    }, [page, searchTerm]);

    const fetchTodo = async () => {
        setLoading(true);
        try {
            const params = { page, page_size: pageSize };
            if (searchTerm) params.search = searchTerm;

            const res = await api.get("todo/", { params });

            const data = res.data.results ?? res.data;
            setTodo(data);

            if (res.data.count) {
                setTotalPages(Math.ceil(res.data.count / pageSize));
            } else {
                setTotalPages(1);
            }
        } catch (err) {
            console.error(err);
            alert("Error fetching todo List");
        } finally {
            setLoading(false);
        }
    };

    //Delete handler function

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this List?")
        if (!confirmDelete) {
            return;
        }
        try {
            await deleteTodo(id);
            alert("List deleted successfully");
            fetchTodo();
        } catch (err) {
            alert("Failed to delete List");
        }
    }


    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h3>Todo List</h3>
                <Link to="/add-todo" className="btn btn-success">Add</Link>
            </div>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by title, description or status"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                }}
            />

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>title</th>
                                <th>description</th>
                                <th>status</th>
                                <th>user</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {todo.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No List found
                                    </td>
                                </tr>
                            ) : (
                                todo.map((todo) => (
                                    <tr key={todo.todoId}>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.status}</td>
                                        <td>{todo.username || todo.user?.username || todo.userid || "Unknown"}</td>
                                        <td>
                                            <Link
                                                to={`/edit-todo/${todo.todoId}`}
                                                className="btn btn-sm btn-primary me-2"
                                            >
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(todo.todoId)} className="btn btn-sm btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => setPage(p => Math.max(p - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>

                        <span>Page {page} of {totalPages}</span>

                        <button
                            className="btn btn-outline-primary ms-2"
                            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoList;