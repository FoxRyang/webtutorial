const http = require('http');
const fs = require('fs');
const url = require('url');
const { debug } = require('console');

var dataList = [];

class MainPage {
    constructor() {
        this.title = "";
        this.urlData;
        this.description = "";
        this.queryData;
        this.GetInnerTemplate = this._GetInnerTemplate.bind(this);
        this.GetListBody = this._GetListBody.bind(this);
        this.RequestSuccess = this._RequestSuccess.bind(this);
    }
    _GetInnerTemplate() {
        return CreateTemplate(this.title, this.GetListBody(), this.description);
    }
    _GetListBody() {
        var listResult = "<ul> ";
        var list = dataList;
        list.forEach(elem => {
            listResult += `<li><a href ='/?id=${elem}'>${elem}</a></li> `;
        });
        listResult += "</ul>";
        return listResult;
    }
    _RequestSuccess(response) {
        var body = this.GetInnerTemplate();
        response.writeHead(200);
        response.end(body);
    }
    _RequestCallback(request, response) {
        console.log(this);
        this.urlData = url.parse(request.url, true);
        this.queryData = this.urlData.query;
        this.title = this.queryData.id;
        if (this.urlData.href == '/') {
            this.title = "Welcome";
        }
        try {
            var pathname = this.urlData.pathname;
            if (pathname === '/') {
                if (this.queryData.id === undefined) {
                    this.title = 'Welcome';
                    this.description = 'hello, let\'s go mapodaegyo';
                    console.log("from here hello");
                    this.RequestSuccess(response);
                } else {
                    console.log(`request from id : ${this.queryData.id}`);
                    IdRequest(this, this.queryData.id);
                }
            } else if (pathname === '/create') {
                this.title = "WEB - create";
                BodyRequest(this, 'form.html');
            } else if (pathname == '/process_create') {
                this.description = "SUUUCEEEEEEEES";
                console.log("SUUUCESSS");
                this.RequestSuccess(response);
            }
            else {
                console.log(__dirname + this.url);
                this.description = fs.readFileSync(__dirname + this.urlData.href);
                console.log("from heredir");
                this.RequestSuccess(response);
            }
        } catch (e) {
            console.log(e);
            Failed();
        }

        function Failed() {
            response.writeHead(404);
            response.end('Terminate with error');
        }
        function IdRequest(self, id) {
            BodyRequest(self, `./data/${id}`);
        }
        function BodyRequest(self, path) {
            fs.readFile(path, 'utf8', function (err, data) {
                self.description = data;
                console.log("from here");
                self.RequestSuccess(response);
            });
        }
    }
}

function CreateTemplate(title, list, body) {
    var template = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>proto - ${title}</title>
                <meta charset="utf-8">
                    <link rel="stylesheet" href="style.css">
                        <script src="colors.js"></script>
            </head>
                <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                <ul>
                    <li> no no</li>
                    <li> no? i report you</li>
                </ul>
                <a href="/create">create</a>

                <article>${body}</article>

                <p>
                    <a href="https://opentutorials.org">opentutorials</a>
                </p>
                </body>
        </html>
`;
    return template;
}

fs.readFile('sample.txt', 'utf8', function (err, data) {
    if (err !== null) {
        console.log(err);
        return;
    }
    console.log(data);
});

fs.readdir('./data/', function (error, filelist) {
    console.log(filelist);
    dataList = filelist;
})

// var args = process.argv;
// args = args;
// console.log(args);

var pageObject = new MainPage();

var app = http.createServer(function (request, response) {
    pageObject._RequestCallback(request, response);
});
app.listen(3000);