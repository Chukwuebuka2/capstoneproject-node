// Importing the necessary modules

// for creating server
const http = require('http');

// for reading and writing into files
const fs = require('fs');

// for getting information about the os
const os = require('os');

// Creating the host and port
const host = '127.0.0.1';
const port = '5000';


// creating our server
const server = http.createServer((req, res) => {
    // Handling the pages and routing them to the designated urls
    const urlPath = req.url

    // for the home url "/"
    if (urlPath === '/'){
        
        // setting status code and header
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        // using the fs module to read the html page
        var myReadStream = fs.createReadStream("./pages/index.html", 'utf8');
        myReadStream.pipe(res)
    }

    if (urlPath === '/about'){

        // setting status code and header
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        // using the fs module to read the html page
        var myReadStream = fs.createReadStream("./pages/about.html", 'utf8');
        myReadStream.pipe(res)
    }

    if (urlPath === '/sys'){

        // setting status code and header
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');

        // things to write into the file
        const hostname = os.hostname();
        const platform = os.platform();
        const architecture = os.arch();
        const numberOfCPUS = os.cpus().length;
        const networkInterfaces = os.networkInterfaces();
        const uptime = os.uptime();

        // arranging them into the JSON format
        var jsonData = {
            "hostname": hostname,
            "platform": platform,
            "architecture": architecture,
            "numberOfCPUS": numberOfCPUS,
            "networkInterfaces": networkInterfaces,
            "uptime": uptime
        }

        // stringify JSON Object
        var jsonContent = JSON.stringify(jsonData);

        // Writing into the osinfo.json file
        fs.writeFile("./osinfo.json", jsonContent, 'utf8', err => {
            if (err){
                console.error(err);
                return;
            }
        })

        // response to user
        res.end("Your OS info has been saved successfully!")

    }
    
    // for other pages
    else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        // using the fs module to read the html page
        var myReadStream = fs.createReadStream("./pages/404.html", 'utf8');
        myReadStream.pipe(res)
    }

});

// listening to the port
server.listen(port, host, () =>{
        console.log(`Server is running at ${host}:${port}`);
    }
);