import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";

const PORT = 8000;

const __dirname = import.meta.dirname; // current module's directory

const server = http.createServer(async (req, res) => {
    await serveStatic(req, res, __dirname);
})

server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})