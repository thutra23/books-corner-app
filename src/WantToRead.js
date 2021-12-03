import React from "react";

const WantToRead = props => {
    return ( 
        <>
            <h1>The books you want to read</h1>

            <ul className="allBooks">

            {props.wantToRead == false ? <div className="emptyList" >You haven't added any books to this list yet !</div>: null} 

            {props.wantToRead !== undefined ? 
            props.wantToRead.map((book,index)=>(
                <li className="bookCard" key={index}> 
                    <h2>{book.name}</h2>
                    <h3>{book.author}</h3>
                    <div>Summary: {book.summary}</div>

                    <button id={index} onClick={()=>props.deleteBook(book._id)}>Remove</button>

                 </li>
            ))
            :
            null
            } 
            </ul>

        </>

     );
}
 
export default WantToRead;