import React, {Component} from 'react';
import io from 'socket.io-client';
import { connect  } from 'react-redux';
import { updateData } from './redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import BarChart from './components/BarChart';
import LineChart from './components/LineChart';

import './App.css';

toast.configure({
  autoClose: 1500,
  draggable: false,
});

const socket = io('http://localhost:3000');

class  App extends Component {
  constructor(props){
    super()
    this.state = {
      userNumber:null
    }
  }

  
  componentDidMount(){
    // підписуємось на івент серверу 
    // далі ми моглиб прямо тут і працювати з данними записуючи їх в State, 
    // але у реальному додатку ми можемо використовувати данні не тільки у цій компоненті а і в дочірніх при чому не знаючи рівень вложеності цих компонентів
    // тому я надаю перевагу Redux - далі ми зможемо підписатись на Redux Store в будьякій компоненті(див. LineChart, BarChart)
    // (можна ще заюзати нову API React - Context)
    socket.on('data', data=>{

      // трігеримо Redux action
      this.props.updateData(data)

      const {userNumber} = this.state
      // показуємо алерт якшо виконується умова 
      if(userNumber && userNumber<=data.value){
        toast(`${data.value} is grater than ${userNumber}`);
      }
    });
  }
  render(){
    return (
      <div className="App">
        <div>
          <input 
            onChange={(e)=>{
              this.setState({userNumber:e.target.value})
            }} 
            type="number"
          />
        </div>
        <div className='block-wrapper'>
          <LineChart/>
        </div>
        <div className='block-wrapper'>
          <BarChart/>
        </div>
        <ToastContainer />
      </div>
    );
  }
  
}


// використовуючи connect ми прокидаємо Redux action в properties
export default connect(null, {updateData})(App);
