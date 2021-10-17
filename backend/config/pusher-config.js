import Pusher from 'pusher'


const pusher = new Pusher({
    appId: "1281219",
    key: "551b7c71ac6c054c4c01",
    secret: "81f1d70d18df0dacb215",
    cluster: "ap2",
    useTLS: false
});



const pusherConnection = db => {
    console.log('Pusher DB Instance connected')

    const books = db.collection('books')
    const changeStream = books.watch();

    changeStream.on('change', change => {
        if(change.operationType === 'insert'){
            console.log('Triggerring Pusher')
            pusher.trigger('books', 'inserted', {
                change: change
            })
        } else if(change.operationType === 'updated'){
            console.log('Triggerring Pusher status Update')
            pusher.trigger('books', 'inserted', {
                change: change
            })
        } else
            console.log("Error triggering Pusher Js I dont know why")
    })
}

export default pusherConnection;