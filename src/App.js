import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import About from './components/common/About'
// import Register from './components'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        {/* <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/memoryindex" component={MemoryIndex} /> */}
      </Switch>
    </BrowserRouter>
  )
}

export default App