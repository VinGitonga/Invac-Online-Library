import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from '@chakra-ui/react';
import Navbar from './components/Navbar'
import Browse from './pages/Browse'
import Books from './pages/Books'
import CategoriesList from './components/CategoriesList'
import AddCategory from './components/AddCategory'
import AddBook from './pages/AddBook'
import Register from './pages/Register'
import Login from './pages/Login'


function App() {
    return (
        <Router>
            <Container maxW="1300px" m="auto" pl="35px" pr="35px">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Browse} />
                    <Route exact path="/browse" component={Books} />
                    <Route exact path="/search/:keyword" component={Books} />
                    <Route exact path="/categories" component={CategoriesList} />
                    <Route exact path="/addbook" component={AddBook} />
                    <Route exact path="/add_category" component={AddCategory} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </Container>
        </Router>
    )
}

export default App;
