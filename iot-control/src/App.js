import React from 'react';
import axios from 'axios';

class App extends React.Component {
  saveToFile = (data) => {
    console.log('Sending data:', data);
    axios.post('http://localhost:5000/api/save', { data })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };
  

  handleButton1Click = () => {
    this.saveToFile('1');
  };

  handleButton2Click = () => {
    this.saveToFile('0');
  };

  render() {
    return (
      <div>
        <h1>React File Writer</h1>
        <button onClick={this.handleButton1Click}>ON</button> &nbsp;&nbsp;
        <button onClick={this.handleButton2Click}>OFF</button>
      </div>
    );
  }
}

export default App;
