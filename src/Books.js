import React from "react";

const Books = props => {

    return ( 
    
        <ul className="allBooks">
            {props.books !== undefined  ?  
            props.books.map((book,index)=>(
                <div key={index}>
                    <li key={index} className="bookCard" >
                
                        <h2>{book.name}</h2>
                        <h3>{book.author}</h3>
                        <p>Summary: {book.summary}</p>
    
                        <button id={index} onClick={
                            (event)=>
                            props.addBookToWantToRead(event, book._id)

                        }>{ book.wantToRead == true ?  "Added to Want To Read!" : "Want To Read"}</button>
                        
                        <button id={index} onClick={
                            (event)=>props.addBookToHaveRead(event, book._id)
                        }>{book.haveRead == true ? "Added to Have Read!" : "Have Read"}</button>

                        <button id="deleteBook" onClick={()=>props.deleteBook(book._id)}>Delete</button>
                    </li>   
                </div>
            ))
            : 
            null
        }
        </ul>
     );
}
 
export default Books;