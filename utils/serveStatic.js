import path from "node:path";
import fs from "node:fs/promises";
import { getContentType } from "./getContentType.js";
import { sendResponse } from "./sendResponse.js";

export async function serveStatic(req, res, baseDir){
    const publicDir = path.join(baseDir, 'public');
    const pathToResource = path.join(publicDir, req.url === "/" ? 'index.html' : req.url);
    const ext = path.extname(pathToResource);
    const contentType = getContentType(ext);
    try{
        const payload = await fs.readFile(pathToResource);
        sendResponse(res, 200, contentType, payload);

    }
    catch(err){
        if(err.code === 'ENOENT'){
            const notFoundPath = path.join(baseDir, "public", "404.html");
            const notFoundContent = await fs.readFile(notFoundPath);
            sendResponse(res, 404, 'text/html', notFoundContent);
        }
        else{
            sendResponse(res, 500, 'text/html', `<html><h1>Internal Server Error: ${err}</h1></html>`);
        }

    }

}