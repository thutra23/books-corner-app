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


const App = props => {

    const [isMounted, setIsMounted] = useState(false);

    const history = useHistory();
    
    useEffect(()=>{
        if(window.originalUrl) {   
          history.push(window.originalUrl);
        }
      }, [])

    useEffect(function refreshAllBooksOnce() {
        setIsMounted(true);
        setLoading(true);
        axios.get("/books")
        .then(result=>{
            if(isMounted){
                setBooks(result.data)
                // setLoading(false)
            }})
            
        .catch(error=>{
            console.log(error);
            setLoading(false)})
            

        return ()=>{ setIsMounted(false) }
    },[books])

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

    useEffect(()=>{
        setIsMounted(true);
        // setLoading(true);
        if ( loading ) {
            axios.get("/books")
            .then(result=> 
                // {
                // if(isMounted) {
                    setBooks(result.data)
                    // setLoading(true)
            //     }
            // }
            )
               
            .catch(error=>console.log(error));

            return ()=>{setIsMounted(false)}
        } 

    }, [loading])

    useEffect(()=>{

        setIsMounted(true);  

        setLoading(true);
        
        axios.get("/books")
        .then(result=>{
           if(isMounted) 
           {
                if (result.data.length > 0) {
                    setWantToRead( result.data.filter(book=>book.wantToRead == true))  

                }

                setLoading(false);
           }
            })
      
        .catch(error=>
            {
            if(!isMounted) {
                console.log(error)
                setLoading(false);
            };
        }
        )       

        //cleanup function
        return  () => { setIsMounted(false)}

    }, [books])

    useEffect(()=>{
        setIsMounted(true);
        axios.get("/books")
        .then(result=>
            {
            if(isMounted && result.data.length > 0) {
                setHaveRead(result.data.filter(book=>book.haveRead == true))
            }

            setLoading(false);
        }
        )
        .catch(error=>console.log(error));

        return ()=>{setIsMounted(false)}
       
    }, [books])

    //this add function is working correctly now, shows book immediately after adding
    const addBookToWantToRead = (event, id)=>{
        event.preventDefault();

        //set loading to true so it fetches the books array and filters the new want to read array 
        setLoading(true);

        console.log(id);  
        
        console.log("button clicked ! added to want to read !")

        axios.post("/books/WantToRead", {id: id})
        .then(result=>setLoading(true))
        .catch(error=>console.log(error)
        );

    
    };

    const addBookToHaveRead = (event, id)=>{
        event.preventDefault();

        setLoading(true);

        console.log(id);

        console.log("button clicked ! added to have read !")

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


    // const [nameError, setNameError] = useState();

    // const [authorError, setAuthorError] = useState();

    // const [summaryError, setSummaryError] = useState();

    // const validateForm= ()=>{
    //     let nameError = "";
    //     let authorError = "";
    //     let summaryError = "";

    //      if(name.trim() == "")  {
    //         nameError="Please enter book's name."
    //     } else if (name.length < 2) {
    //         nameError="Name is too short! Name must be between 2 and 30 characters."
    //     } else if (name.length > 30) {
    //         nameError=" Name is too long! Name must be between 2 and 30 characters. "
    //     }

    //     if(author.trim() == "")  {
    //         authorError= "Please enter author's name."
    //     } else if (author.length < 3) {
    //         authorError="Author's name is too short! Author's name must be between 3 and 20 characters."
    //     } else if (author.length > 20) {
    //         authorError=" Author's name is too long! Author's name must be between 3 and 20 characters. "
    //     }

    //     if (summary.trim() == "")  {
    //         summaryError= "Please enter a short summary."
    //     } else if (summary.length < 3) {
    //         summaryError=" Summary is too short! Summary must be between 3 and 20 characters."
    //     } else if (summary.length > 30) {
    //         summaryError=" Summary is too long! Summary must be between 3 and 30 characters. "
    //     }

    //     if (nameError || authorError || summaryError) {
    //         setNameError(nameError);
    //         setAuthorError(authorError);
    //         setSummaryError(summaryError);

    //         return false;
    //     } 

    //     return true;
    // }

    const [errors, setErrors] = useState({});


    const handleFormSubmit = (event)=>{
        event.preventDefault();

        let error = {
            name: "",
            author: "",
            summary:""
        }

        // const isValid = validateForm();

        // if (isValid) {
        //     console.log(isValid);
        //     setName("");
        //     setAuthor("");
        //     setSummary("");
        //     setNameError("");
        //     setAuthorError("");
        //     setSummaryError("");
            
        // }

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
            setLoading(true)
        }
        )
        .catch(error=>{
                // console.log(error.response)

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

        // setErrors(error);

    }

    return ( 
        <Router>
            <div className="App">
                   
                        
            <Navbar />

            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <BookForm books={books} name={name} author={author} handleNameChange={handleNameChange} handleAuthorChange={handleAuthorChange} handleFormSubmit={handleFormSubmit} summary={summary} handleSummaryChange={handleSummaryChange} wantToRead={wantToRead}  
                        // nameError={nameError} authorError={authorError} summaryError={summaryError} 
                        errors={errors} />

                        {books.length > 0 ? <h1>All your books</h1> : null}

                        <Books books={books} 
                        addBookToWantToRead={addBookToWantToRead}
                        deleteBook={deleteBook} addBookToHaveRead=
                        {addBookToHaveRead} 
                        
                        />

                    </Route>

                    <Route exact path="/WantToRead">
                            < WantToRead addBookToWantToRead={addBookToWantToRead} wantToRead={wantToRead} deleteBook={deleteBook}  />
                    </Route>

                    <Route exact path="/HaveRead">
                            < HaveRead haveRead={haveRead} deleteBook={deleteBook}
                           
                            />
                    </Route>
                </Switch>
                </div>
            </div>
        </Router>

     );
}
 
export default App;