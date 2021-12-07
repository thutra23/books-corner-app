import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

import BookForm from "./BookForm";
import Books from "./Books";
import Navbar from "./Navbar";
import WantToRead from "./WantToRead";
import HaveRead from "./HaveRead";
import Footer from "./Footer";


const App = props => {

    const [isMounted, setIsMounted] = useState(false);

    const history = useHistory();
    
    useEffect(()=>{
        if(window.originalUrl) {   
          history.push(window.originalUrl);
        }
      }, [])

    // useEffect(function refreshAllBooksOnce() {
    //     setIsMounted(true);
    //     setLoading(true);
    //     axios.get("/books")
    //     .then(result=>{
    //         if(isMounted){
    //             setBooks(result.data)
    //         }})
            
    //     .catch(error=>{
    //         console.log(error);
    //         setLoading(false)})
        
    //     return ()=>{ 
    //         setIsMounted(false);
    //         setLoading(false); 
    //     }
    // },[books])

    const [books, setBooks] = useState([]);

    const [name, setName] = useState("");

    const [author, setAuthor] = useState("");

    const [summary, setSummary] = useState("");

    const [wantToRead, setWantToRead] = useState([]);

    const [haveRead, setHaveRead] = useState([]);

    const [loading, setLoading] = useState(true);

    const deleteBook = (id)=>{
        axios.delete("/books/"+id)
        .then(result=>
            console.log(result.data),
            setBooks(books.filter(book=>book._id !== id))
 
            )
        .catch(error=>console.log(error));
    }

    const deleteWantToRead = (id) =>{
        axios.delete("/books/WantToRead/"+id)
        .then(result=>{
            // setLoading(true);
            setBooks(books.filter(book=>book._id !== id))
            setLoading(true);
        })
        .catch(error=>console.log(error));
    }


    const deleteHaveRead = (id) =>{
        axios.delete("/books/HaveRead/"+id)
        .then(result=>{
            setBooks(books.filter(book=>book._id !== id))
            setLoading(true);
        })
        .catch(error=>console.log(error));
    }

    useEffect(()=>{
        console.log("loading books!")
        setIsMounted(true);
        // setLoading(true);
        if ( loading ) {
            axios.get("/books")
            .then(result=> {
                setBooks(result.data);
                
                if (result.data.length > 0) {
                setWantToRead( result.data.filter(book=>book.wantToRead == true));
                setHaveRead(result.data.filter(book=>book.haveRead == true))
            } else {
                setWantToRead([]);
                setHaveRead([])
            }})  
            .catch(error=>console.log(error));
            
            setLoading(false);

            return ()=>{
                setIsMounted(false);
                setLoading(false);
            }
        } 

    }, [loading])

    // useEffect(()=>{
    //     console.log(loading)
    // }, [loading])


    // useEffect(()=>{
    //     console.log("loading want to read!");
    //     axios.get("/books")
    //     .then(result=>{
    //             if (result.data.length > 0) {
    //                 setWantToRead( result.data.filter(book=>book.wantToRead == true)) 
    //        } else {
    //            setWantToRead([]);
    //        }
    //     })
    //     .catch(error=>{
    //             console.log(error)
    //             setLoading(false);
    //     }
    //     )       
    //     //cleanup function
    //     return  () => { setIsMounted(false)}

    // }, [books])

    // useEffect(()=>{
    //     setIsMounted(true);
    //     axios.get("/books")
    //     .then(result=>{
    //         if(isMounted && result.data.length > 0) {
    //             setHaveRead(result.data.filter(book=>book.haveRead == true))
    //         } else {
    //             setHaveRead([])
    //         }     

    //         setLoading(false);
    //     })
    //     .catch(error=>console.log(error));

    //     return ()=>{setIsMounted(false)}
       
    // }, [books])

    const addBookToWantToRead = (event, id)=>{
        event.preventDefault();

        setLoading(true);

        axios.post("/books/WantToRead", {id: id})
        .then(result=>setLoading(true))
        .catch(error=>console.log(error)
        );
    };

    const addBookToHaveRead = (event, id)=>{
        event.preventDefault();

        setLoading(true);

        axios.post("/books/HaveRead", {id: id})
        .then(result=>setLoading(true))
        .catch(error=>console.log(error))
    }

    const handleNameChange=(event)=>{
        setName(event.target.value);
    }

    const handleAuthorChange=(event)=>{
        setAuthor(event.target.value);
    };

    const handleSummaryChange = (event)=>{
        setSummary(event.target.value);
    };

    //client side form validation 
    const [nameError, setNameError] = useState();

    const [authorError, setAuthorError] = useState();

    const [summaryError, setSummaryError] = useState();

    const validateForm= ()=>{
        let nameError = "";
        let authorError = "";
        let summaryError = "";

         if(name.trim() == "")  {
            nameError="Please enter book's name."
        } else if (name.length < 2) {
            nameError="Name is too short! Name must be between 2 and 30 characters."
        } else if (name.length > 30) {
            nameError=" Name is too long! Name must be between 2 and 30 characters. "
        }

        if(author.trim() == "")  {
            authorError= "Please enter author's name."
        } else if (author.length < 2) {
            authorError="Author's name is too short! Author's name must be between 2 and 20 characters."
        } else if (author.length > 20) {
            authorError=" Author's name is too long! Author's name must be between 2 and 20 characters. "
        }

        if (summary.trim() == "")  {
            summaryError= "Please enter a short summary."
        } else if (summary.length < 3) {
            summaryError=" Summary is too short! Summary must be between 3 and 40 characters."
        } else if (summary.length > 40) {
            summaryError=" Summary is too long! Summary must be between 3 and 40 characters. "
        }

        if (nameError || authorError || summaryError) {
            setNameError(nameError);
            setAuthorError(authorError);
            setSummaryError(summaryError);

            return false;
        } 

        return true;
    }

    const [errors, setErrors] = useState({});

    const handleFormSubmit = (event)=>{
        event.preventDefault();

        let error = {
            name: "",
            author: "",
            summary:""
        }

        const isValid = validateForm();

        if (isValid) {
            console.log(isValid);
            setName("");
            setAuthor("");
            setSummary("");
            setNameError("");
            setAuthorError("");
            setSummaryError("");
            
        }

        const book = {
            name: name,
            author: author,
            summary: summary,
            wantToRead: false,
            haveRead: false
        }

        axios.post("/books", book)
        .then(result=>{
            setErrors(error),
            console.log(result.data), 
            console.log(loading)
            setLoading(true)
            
        }
        )
        .catch(error=>{

            if(error?.response?.status == 422) {
                error?.response?.data?.errors?.forEach(({message, path})=>{
                    if(path[0]=='name') {
                        return (error.name = message)
                    }
                    if(path[0]=='author') {
                        return (error.author = message)
                    }
                    if(path[0]='summary') {
                        return (error.summary = message)
                    }
                })
            }
          
        })
        setErrors(error);
    }

    return ( 
        <Router>
            <div className="App">
            <Navbar />
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <BookForm books={books} name={name} author={author} handleNameChange={handleNameChange} handleAuthorChange={handleAuthorChange} handleFormSubmit={handleFormSubmit} summary={summary} handleSummaryChange={handleSummaryChange} wantToRead={wantToRead}  
                        nameError={nameError} authorError={authorError} summaryError={summaryError} 
                        errors={errors} deleteWantToRead={deleteWantToRead} deleteHaveRead={deleteHaveRead} />

                        {books.length > 0 ? <h1>All your books</h1> : null}

                        <Books books={books} addBookToWantToRead={addBookToWantToRead} deleteBook={deleteBook} addBookToHaveRead=
                        {addBookToHaveRead} 
                        
                        />

                    </Route>

                    <Route exact path="/WantToRead">
                            < WantToRead addBookToWantToRead={addBookToWantToRead} wantToRead={wantToRead} deleteBook={deleteBook} deleteWantToRead={deleteWantToRead}  />
                    </Route>

                    <Route exact path="/HaveRead">
                            < HaveRead haveRead={haveRead} deleteBook={deleteBook} deleteHaveRead={deleteHaveRead}
                           
                            />
                    </Route>
                </Switch>
                </div>
                <Footer />
            </div>
        </Router>

     );
}
 
export default App;