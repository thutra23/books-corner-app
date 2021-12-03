import React from "react";

const HaveRead = props => {
    return ( 
        <>
            <h1>The books you have read</h1>

            <ul className="allBooks">

            {props.haveRead == false ? <div className="emptyList" >You haven't added any books to this list yet !</div>: null} 

            {props.haveRead !== undefined ? 
            props.haveRead.map((book,index)=>(
                <li className="bookCard" key={index}> 
                    <h2>{book.name}</h2>
                    <h3>{book.author}</h3>
                    <div>Summary: {book.summary}</div>

                    <button id="deleteBook" onClick={()=>props.deleteBook(book._id)}>Remove</button>
                </li>
            )
            )
            :
            null
            } 
            </ul>


        </>
     );
}
 
export default HaveRead;