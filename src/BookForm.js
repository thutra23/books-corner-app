import React from "react";


const BookForm = props => {
 
    return ( 
        <div className="addBookForm">
        <h2>Add a book: </h2>
            <form action="/books" method="POST" id="bookForm" onSubmit={event=>props.handleFormSubmit(event)}>
                <label>Book name: 
                    <input id="bookName" type="text" value ={props.name} onChange={props.handleNameChange}></input>
                </label>
                {props.nameError ? <div className="errorMessage">{props.nameError}</div> : null}


                <label>Author:
                    <input  id="bookAuthor" type="text" value={props.author} onChange={props.handleAuthorChange}></input>
                
                </label>

                {props.authorError ? <div className="errorMessage">{props.authorError}</div> : null}

                <label>
                    Summary: 
                    <textarea  id="bookSummary" type="text" value = {props.summary} onChange={props.handleSummaryChange}> 
                    </textarea>
                   
                    </label>
                    
                    {props.summaryError ? <div className="errorMessage">{props.summaryError}</div> : null}
                    
                <button className="submitBtn">Submit</button>

            </form>

        </div>
     );
}
 
export default BookForm;