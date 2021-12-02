import React from "react";

const WantToRead = props => {
    return ( 
        <>
            <h1>The books you want to read</h1>

            <ul className="allBooks">

            {console.log(props.wantToRead)}

            {props.wantToRead == false ? <div style={{color:"black"}}>You haven't added any books to this list yet !</div>: null} 


            {props.wantToRead !== undefined ? 
            props.wantToRead.map((book,index)=>(
                <li className="bookCard" key={index}> 
                     {console.log(book)}
                    <h2>Name: {book.name}</h2>
                    <h3>Author: {book.author}</h3>
                    <div>Summary: {book.summary}</div>

                    <button id={index} onClick={()=>props.deleteBook(book._id)}
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
 
export default WantToRead;