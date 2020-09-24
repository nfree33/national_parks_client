import React, {useState, useEffect} from 'react';
import Parks from './components/Parks.js'


function App(props) {
    const [parks, setParks] = useState([])
    const [formInputs, updateFormInputs] = useState({
      name: '',
      description: '',
      location: '',
      avg_visitors: ''
    })
    
  const handleChange = (event) => {
    const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value })
    updateFormInputs(updateInput)
  }

  const handleSubmit = async (event) =>{
    event.preventDefault()
    try{
      const response = await fetch('http://localhost:3000/parks', {
        body: JSON.stringify(formInputs),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      updateFormInputs({
        author: '',
        content: '',
        title: ''
      })
      setParks([data, ...parks])
    }catch(error){
      console.error(error)
    }
  }

  const getParks = async () => {
    try {
      const response = await fetch('http://localhost:3000/parks')
      const data = await response.json()
      setParks(data, ...parks)

      console.log(data)
     } catch(error){
       console.error(error)
     }
   } 
 useEffect(()=>{
   (async function (){
     await getParks()
       })()
     },[])

  return (
    <div>
    <Parks parks={parks}/>
    <h4>Add a Park</h4>
    <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={handleChange}/>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" onChange={handleChange}/>
            <label htmlFor="location">Location</label>
            <input type="text" id="location" onChange={handleChange}/>
            <label htmlFor="avg_visitors">Avg Visitors</label>
            <input type="number" id="avg_visitors" onChange={handleChange}/>
            <input type="submit" className="submit" />
          </form>
    </div>
  );
}

export default App;
