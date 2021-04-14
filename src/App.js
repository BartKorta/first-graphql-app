const axios = require("axios")
const { GraphQLServer } = require('graphql-yoga');
const resolvers = {
    User: {
        todos: async (parent, args, context, info) => getTodoListForUser(parent.id)
    },
    ToDoItem: {
        user: async (parent, args, context, info) => getRestUserById(parent.user_id)
    },
    Query: {
        users: async () => getRestUsersList(),
        todos: async () => getTodoList(),
        todo: async(parent, args, context, info) => getTodoById(parent, args, context, info),
        user: async (parent, args, context, info) => getRestUserById(args.id),
    }
}
function todoById(parent, args, context, info){
    return todosList.find(t => t.id == args.id);
}
function userById(parent, args, context, info){
    return usersList.find(u => u.id == args.id);
}

async function getTodoListForUser(id){
    try {
        const todos = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
        console.log(todos);
        return todos.data.map(({ userId, id, title, completed }) => ({
            id: id,
            title: title,
            completed: completed,
            user_id: userId,
        }))
    } catch (error) {
        throw error
    }
}
async function getTodoListForUser(id){
    try {
        const todos = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
        console.log(todos);
        return todos.data.map(({ userId, id, title, completed }) => ({
            id: id,
            title: title,
            completed: completed,
            user_id: userId,
        }))
    } catch (error) {
        throw error
    }
}
// async function -> replace user list with real data from REST Api
async function getRestUsersList(){
    try {
        const users = await axios.get("https://jsonplaceholder.typicode.com/users")
        console.log(users);
        return users.data.map(({ id, name, email, username }) => ({
            id: id,
            name: name,
            email: email,
            login: username,
        }))
    } catch (error) {
        throw error
    }
}
async function getTodoList(){
    try {
        const todos = await axios.get("https://jsonplaceholder.typicode.com/todos")
        console.log(todos);
        return todos.data.map(({ userId, id, title, completed }) => ({
            id: id,
            title: title,
            completed: completed,
            user_id: userId,
        }))
    } catch (error) {
        throw error
    }
}
async function getTodoById(parent, args, context, info){
    try {
        const id = args.id
        const todo = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        console.log(todo)
        return (({id, title, completed, userId}) => ({id, title, completed, user_id: userId}))(todo.data)

    } catch (error) {
        throw error
    }
}
async function getRestUserById(id){
    try {
        const user = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        console.log(user)
        return (({ id, name, email, username }) => ({ id, name, email, login: username }))(user.data)
    } catch (error) {
        throw error
    }
}
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});


const usersList = [
    { id: 1, name: "Jan Konieczny", email: "jan.konieczny@wonet.pl", login: "jkonieczny" },
    { id: 2, name: "Anna Wesołowska", email: "anna.w@sad.gov.pl", login: "anna.wesolowska" },
    { id: 3, name: "Piotr Waleczny", email: "piotr.waleczny@gp.pl", login: "p.waleczny" }
];
const todosList = [
    { id: 1, title: "Naprawić samochód", completed: false, user_id: 3 },
    { id: 2, title: "Posprzątać garaż", completed: true, user_id: 3 },
    { id: 3, title: "Napisać e-mail", completed: false, user_id: 3 },
    { id: 4, title: "Odebrać buty", completed: false, user_id: 2 },
    { id: 5, title: "Wysłać paczkę", completed: true, user_id: 2 },
    { id: 6, title: "Zamówic kuriera", completed: false, user_id: 3 },
];

server.start(() => console.log(`Server is running on http://localhost:4000`));