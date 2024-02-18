import express from "express";

const app = express();

app.use(express.static('dist'))

// app.get('/', (req, res) => {
//     res.send('server is ready');
// });

// get a list of 5 jokes
app.get("/api/jokes", (req, res) => {
    const jokes = [
        {
            id: 1,
            title: 'Why did the scarecrow win an award?',
            content: 'Because he was outstanding in his field.'
        },
        {
            id: 2,
            title: 'What do you call a fake noodle?',
            content: 'An impasta.'
        },
        {
            id: 3,
            title: "Why don't scientists trust atoms?",
            content: "Because they make up everything."
        },
        {
            id: 4,
            title: "Why did the bicycle fall over?",
            content: "Because it was two-tired."
        },
        {
            id: 5,
            title: "Why did the computer go to therapy?",
            content: "It had a virus in its hard drive."
        }
    ];

    res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at  http://localhost:${port}`);
});