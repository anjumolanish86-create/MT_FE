//Imports the axios library for making HTTP requests
//Promise based HTTP client Used to make requests from the browser to the backend api.
import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",

});

//ads a request interceptor
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");

    //Do not attach tokens for public routes
    const publicRoutes = ["login/", "signup/"];

    const isPublicRoute = publicRoutes.some((route) => config.url.includes(route));
    if (!isPublicRoute && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
});

//adds a response interceptor 
apiClient.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (err.response?.status === 401) {
            localStorage.clear();
            window.location.href = "/";
        }
        return Promise.reject(err);
    }
);


//API CALLS 
//Login
export const loginUser = (data) => apiClient.post("login/", data);
//Signup
export const signupUser = (data) => apiClient.post("signup/", data);

//Todo
//Create Todo
export const createTodo = (data) => apiClient.post("todo/", data);
//Get Todos
export const getTodos = () => apiClient.get("todo/");
//Update Todo
export const updateTodo = (id, data) => apiClient.put(`todo/${id}/`, data);
//Delete Todo
export const deleteTodo = (id) => apiClient.delete(`todo/${id}/`);
//Get Users
export const getUsers = () => apiClient.get("users/");

export default apiClient;