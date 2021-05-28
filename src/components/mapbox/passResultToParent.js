import React from 'react'

export class NewMemory extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: null,
    }
  }

  handleCallback = (childData) =>{
    this.setState({ data: childData })
  }

  render(){
    const { data } = this.state
    return (
      <div>
        <MapGeocoder NewMemoryCallback = {this.handleCallback}/>
        {data}
      </div>
    )
  }
}

class MapGeocoder extends React.Component{
  
  onTrigger = (event) => {
    this.props.NewMemoryCallback('Data from mapgeocoder')
    event.preventDefault()
  }

  render(){
    return (
      <div>
        <form onSubmit = {this.onTrigger}>
          <input type = "submit" value = "Submit"/>
        </form>
      </div>
    )
  }
}

export default NewMemory