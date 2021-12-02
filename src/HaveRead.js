import React from "react";

const HaveRead = props => {
    return ( 
        <>
            <h1>The books you have read</h1>

            <ul className="allBooks">

            {console.log(props.haveRead)}

            {props.haveRead !== undefined ? 
            props.haveRead.map((book,index)=>(
                <li className="bookCard" key={index}> 
                    {console.log(book)}
                    <h2>Name: {book.name}</h2>
                    <h3>Author: {book.author}</h3>
                    <div>Summary: {book.summary}</div>

                    <button id="deleteBook" onClick={()=>props.deleteBook(book._id)}
                    >Remove</button>

                </li>
            )
            )
            :
            <div>You haven't added any books to this list yet!</div>
            } 
            </ul>


        </>
     );
}
 
export default HaveRead;