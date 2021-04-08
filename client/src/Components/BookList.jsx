import React from 'react';
import styled from 'styled-components';
// import  gql  from 'graphql-tag';
// import {compose, graphql} from '@apollo/client';
import {gql, useQuery} from '@apollo/client'

const GET_ALL_BOOKS = gql `
query {
     allBooks{
        name
        bookId
     }
}
`;

const BookListContainer = styled.div `
 font-family:Century Gothic;
`;
const UnList = styled.ul `
`;
const List = styled.li `
`;
const HeaderText = styled.h1 `
`;
function BookList() {
     const {data, loading, error } = useQuery(GET_ALL_BOOKS)
     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error :(</p>;
          console.log(error);
     console.log(data);
     const books=data.allBooks;
     return (
          <BookListContainer>
               <HeaderText>Books</HeaderText>
               <UnList>
                 {books.map((book)=><List key={book.bookId}>{book.name}</List>)}

               </UnList>
          </BookListContainer>
     )
}

export default BookList;
