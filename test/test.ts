import pty = require('node-pty')


// app.on("ready", async() =>
// {
    
// })
console.log(pty);
var ptyProcess = pty.spawn("cmd.exe", [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: {}
});

ptyProcess.on('data', function(data) {
    console.log(data);
});

ptyProcess.write('dir\r');

setTimeout( () =>
{
    ptyProcess.kill()
}, 5e3)