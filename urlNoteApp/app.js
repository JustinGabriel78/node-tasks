const http = require("http");
const notes = require("./notes.js");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const noteId = req.url.split("/")[2];

    if (req.url === "/notes") {
      const allNotes = notes.loadNotes();
      const stringResponse = notes.stringifyResponse(allNotes,'All notes',true)
      res.statusCode = 200;
      res.write(stringResponse);
      res.end();
    } else if (req.url === "/notes/" + noteId) {
      const error = notes.idError(+noteId);
      
        if (error) {
          const stringResponse = notes.stringifyResponse(null,error,false)
          res.statusCode = 404;
          res.write(stringResponse);
          res.end();
        } else {
          const note = notes.readNote(+noteId);
          const stringResponse = notes.stringifyResponse(note,'Note successfully fetched',true)
          res.statusCode = 200;
          res.write(stringResponse);
          res.end();
        }

    } else {
      const stringResponse = notes.stringifyResponse(null,'Invalid url',false)
      res.statusCode = 400;
      res.write(stringResponse)
      res.end();
    }
  }

  if (req.method === "DELETE") {
    const noteId = req.url.split("/")[2];
    
    if (req.url === "/notes/" + noteId) {
      const error = notes.idError(+noteId);

      if (error) {
        const stringResponse = notes.stringifyResponse(null,error,false)
        res.statusCode = 404;
        res.write(stringResponse);
        res.end();
      } else {
        notes.deleteNote(+noteId);
        const stringResponse = notes.stringifyResponse(null,'Note Deleted',true)
        res.statusCode = 200;
        res.write(stringResponse);
        res.end();
      }

    } else if (req.url === "/notes/") {
      const stringResponse = notes.stringifyResponse(null,"Id required",false)
      res.statusCode = 400;
      res.write(stringResponse);
      res.end();
    } else {
      const stringResponse = notes.stringifyResponse(null,"Invalid url!",false)
      res.statusCode = 400;
      res.write(stringResponse);
      res.end();
    }
  }

  if (req.method === "POST") {

    if (req.url === "/notes") {
      let data = "";

      req.on("data", (chunk) => {
        data = data + chunk.toString();
      });

      req.on("end", () => {
        const body = JSON.parse(data);
        
        if(body.text) {
          const newNote = notes.addNote(body.text);
          const stringResponse = notes.stringifyResponse(newNote,"Note added Successfully",true)
          res.statusCode = 200;
          res.write(stringResponse)
          res.end();
        } else {
          const stringResponse = notes.stringifyResponse(null,"Empty note is not acceptable!",false)
          res.statusCode = 400;
          res.write(stringResponse)
          res.end();
        }

      });
    } else {
      const stringResponse = notes.stringifyResponse(null,"Invalid url!",false)
      res.statusCode = 400;
      res.write(stringResponse)
      res.end();
    }
  }

  if (req.method === "PATCH") {
    const noteId = req.url.split("/")[2];

    if (req.url === "/notes/" + noteId) {
      const error = notes.idError(+noteId);

      if (error) {
        const stringResponse = notes.stringifyResponse(null,error,false)
        res.statusCode = 404;
        res.write(stringResponse);
        res.end();
      } else {
        let data = "";

        req.on("data", (chunk) => {
          data = data + chunk.toString();
        });

        req.on("end", () => {
          const body = JSON.parse(data);
          const updatedNotes = notes.updateNote(+noteId, body.text);
          const stringResponse = notes.stringifyResponse(updatedNotes,"Note updated",true)
          res.statusCode = 201;
          res.write(stringResponse)
          res.end();
        });
      }

    } else if (req.url === "/notes/") {
      const stringResponse = notes.stringifyResponse(null,"Id required",false)
      res.statusCode = 400;
      res.write(stringResponse);
      res.end();
    } else {
      const stringResponse = notes.stringifyResponse(null,"Invalid url!",false)
      res.statusCode = 400;
      res.write(stringResponse)
      res.end();
    }
  }
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
