'use strict';
const electron = require('electron');
// Module to control application life.
const {app} = electron;
var fs = require('fs');
// Module to create native browser window.
const {BrowserWindow} = electron;

const {ipcMain}= electron;
let win;
let ended=false;
let ftplist="";
function createWindow() {

    let electronScreen = electron.screen;
    let size = electronScreen.getPrimaryDisplay().workAreaSize;
///
exports.pong = arg => {  
    //Print 6
    console.log(arg);
}
ipcMain.on('tabora', (event, arg) => {
    fs.writeFile("tambora.csv", arg, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 


});

ipcMain.on('async', (event, arg) => {  
    // Print 1
    console.log(arg);
    while(!ended){
        setTimeout(function() {
            Console.log("Checking");
        }, millisecondsToWait);
    }

    // Reply on async message from renderer process
    event.sender.send('async-reply', ftplist);
   // console.log(ftplist);
});///
    // Create the browser window.
    
    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height
    });

    let url = 'file://' + __dirname + '/index.html';
    let Args = process.argv.slice(1);

    Args.forEach(function (val) {
        console.log("loading now");
        if (val === "--serve") {
            url = 'http://localhost:4200'
        }
    });

    // and load the index.html of the app.
    win.loadURL(url);

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('filezill.csv')
});

lineReader.on('end', () => { win.webContents.send('async', 1); });
lineReader.on('line', function (line) {
    if(line.indexOf("(Barcode)")!=-1){
       // ipcMain.send('async', 1);
       //win.webContents.send('async', 1);
       ended=true;
        console.log("this is the end");
    }
    if(!ended){
        ftplist = ftplist+"\r\n"+line;
    }
 // console.log('Line from file:', line);
});