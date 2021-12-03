import React from "react";


const BookForm = props => {
 
    return ( 
        <div className="addBookForm">
        <h2>Add a book: </h2>
            <form action="/books" method="POST" id="bookForm" onSubmit={event=>props.handleFormSubmit(event)}>
                <label>Book name: 
                    <input id="bookName" type="text" value ={props.name} onChange={props.handleNameChange}></input>
                </label>

                {props.errors ? <div className="errorMessage">{props.errors?.name}</div> : null}


                <label>Author:
                    <input  id="bookAuthor" type="text" value={props.author} onChange={props.handleAuthorChange}></input>
                
                </label>

                {props.errors ? <div className="errorMessage">{props.errors?.author}</div> : null}

                <label>
                    Summary: 
                    <textarea  id="bookSummary" type="text" value = {props.summary} onChange={props.handleSummaryChange}> 
                    </textarea>
                   
                    </label>

                    {console.log(props.errors)}
                    
                    {props.errors ? <div className="errorMessage">
                        {props.errros?.summary}
                    </div> : null}
                    
                <button className="submitBtn">Submit</button>

            </form>

        </div>
     );
}
 
export default BookForm;