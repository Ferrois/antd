import { useState } from 'react'
import { Button, Table } from 'antd'
import axios from "axios";

//Declare columns for table
const columns = [
  {
    title: 'Username',
    dataIndex: 'Username',
    key: 'Username',
  },
  {
    title: 'Password',
    dataIndex: 'Password',
    key: 'Password',
  },
];

function App() {
  const [request, setRequest] = useState([])
  const handleSendRequest = async () => {
    try {
      
      //Await request from server
      const response = await axios.get("http://localhost:8000/users")

      //Add key field into each object (username is unique)
      response.data.forEach(obj=>{
        obj.key = obj.Username
      })

      //Update state
      setRequest(response.data)
  
    } catch (err) {
      console.log(err);
      setRequest([{"key":1,"Username":"error","Password":"error"}])
    };
  }

  return (
    <div>
      <Button onClick={handleSendRequest}>Request User Data</Button>
      <Table columns={columns} dataSource={request}/>
    </div>
  )
}

export default App
