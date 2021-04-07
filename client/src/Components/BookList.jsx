import React from 'react'
import styled from 'styled-components'

const BookListContainer=styled.div`
 font-family:Century Gothic;


`;
const UnList=styled.ul`
`;
const List=styled.li`


`;
const HeaderText=styled.h1`


`;
function BookList() {
     return (
          <BookListContainer>
            <HeaderText>Books</HeaderText>
               <UnList>
                    <List>Book Name</List>

               </UnList>
          </BookListContainer>
     )
}

export default BookList
