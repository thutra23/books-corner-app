# books-corner-app

WMDD4936 Full-stack Individual Project

Books Corner allows users to add their favorite books or whatever book they want. Users can add their books to the "want to read" list or "have read" list to keep track of their reading. Users can also delete the books from either lists and delete from their main list of books as well.

You can run the application by installing npm and run "npm run dev" and "npm run watch" at the same time.

- API documentation:

POST /books : post book
GET /books : get all books
POST /books/WantToRead : change wantToRead property of book to "true"
POST /books/HaveRead : change haveRead property of book to "true"
GET /books/:id : find Book by id
DELETE /books/:id : delete book by id


- Expected POST response format: 

{url: '/books/61a9adf9ee720596ea41d110', data: {…}}
    data:
        author: "franz kafka"
        haveRead: false
        name: "metamorphasis"
        summary: "magical realism"
        wantToRead: false
        __v: 0
        _id: "61a9adf9ee720596ea41d110"
    [[Prototype]]: Object
    url: "/books/61a9adf9ee720596ea41d110"



- Expected GET response format:

[
    {
    \_id: "61a942c040f8949fe526cbe6",
    name: "norwegian wood",
    author: "murakami",
    summary: "young adult novel",
    wantToRead: true,
    haveRead: false,
    \_\_v: 0
    }
]
