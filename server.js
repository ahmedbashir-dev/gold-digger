import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";
import { sendResponse } from "./utils/sendResponse.js";
import { handleGet } from "./handlers/routeHandlers.js";


const PORT = 8000;

const __dirname = import.meta.dirname; // current module's directory


const server = http.createServer(async (req, res) => {
    if(req.url.startsWith("/api")){
        if(req.method === 'GET'){
            await handleGet(res);
        }
        else if(req.method === 'POST'){
            
        }
        else{
            sendResponse(res, 405, 'text/html', `<h1>Method Not Allowed</h1>`)
        }
    }
    else{
        serveStatic(req, res, __dirname);
    }
})

server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})