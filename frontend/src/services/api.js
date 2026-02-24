import axios from "axios"

const API = axios.create({
  baseURL: "https://hrms-06dq.onrender.com",
})

export default API