import App  from './app'

const port = process.env.port || 1337;

App.listen(port,(err) => {
    if(err){
        return console.log(err);
    }
    return console.log('server is listining on port '+port);
})