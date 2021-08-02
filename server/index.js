const express = require("express");
const formidable = require("formidable");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

function getFilesContainingText(files, text) {
    const filesWithText = []
    for (const i in files) {
        const filePath = files[i].path;
        const fileName = files[i].name;
        fs.readFile(filePath, function (err, data) {
            if (err) throw err;
            if(data.includes(text)){
                console.log('TRUE', fileName)
                filesWithText.push(fileName)
            }
            console.log('i',i)
            console.log('filesWithText!!1',filesWithText)
        });
        console.log('filesWithText!!2',filesWithText)
    }
    console.log('filesWithText!!3',filesWithText)
    return filesWithText
}

async function processFiles(files) {
    const blah = await Promise.all(Object.values(files).map((file)=>{
        const filePath = file.path;
        const fileName = file.name;
        console.log('filePath',filePath)
        console.log('fileName',fileName)
        fs.readFile(filePath, function (err, data) {
            if (err) throw err;
            console.log('data',data)
            if(data.includes('TODO')){
                console.log('TRUE', fileName)
                
                return resolve(fileName)
            }
            else {
                return ''
            }
    
        })
    }));
    console.log('blah',blah)
    return blah    
}

app.post("/api/upload/files", (req, res) => {
    const form = formidable({multiple: true});
    form.parse(req, (err, fields, files) => {

        if (err) {
            next(err);
            return;
        }

        const promises = Object.values(files).map((file)=>{
            return new Promise((resolve, reject)=>{
                fs.readFile(file.path, 
                    function(error, data) {
                        if (error) throw error;
                        if (data.includes('TODO')) {
                            resolve(file.name)
                        }
                        else {
                            resolve()
                        }
                        resolve(file.name,data.includes('TODO'))
                        
                    }
                )
            })
        })

        Promise.all(promises).then((data)=>res.send(data.filter(item=>item!=undefined)))
    })

    form.on('end',()=>console.log('end'))
    res.on('end', ()=>{console.log('ended!!')})

  });


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});