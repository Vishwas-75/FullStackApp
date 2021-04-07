import BookList from './Components/BookList'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider} from '@apollo/client/react'

const client =new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache:new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <BookList/>
    </div>
    </ApolloProvider>
  );
}

export default App;
