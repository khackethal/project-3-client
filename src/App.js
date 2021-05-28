import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import About from './components/common/About'

// * auth imports

import AllMemories from './components/memories/AllMemories'
import SingleMemory from './components/memories/SingleMemory'
import MemoryMap from './components/memories/MemoryMap'
import NewMemory from './components/memories/NewMemory'
// import ImageUploadField from './components/memories/ImageUploadField'



import ApiTest from './components/memories/ApiTest'
import ApiTestTwo from './components/memories/ApiTestTwo'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/apitwo" component={ApiTestTwo} />
        <Route exact path="/api" component={ApiTest} />
        {/* <Route exact path="/apitwo" component={ApiTestTwo} /> */}
        <Route path="/about" component={About} />
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/newmemory" component={NewMemory} />
        <Route path="/memories/map" component={MemoryMap} />
        <Route path="/memories/:id" component={SingleMemory} />
        <Route path="/memories" component={AllMemories} />

      </Switch>
    </BrowserRouter>
  )
}

export default App