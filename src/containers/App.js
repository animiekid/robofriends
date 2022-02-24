import React,{Component} from 'react';
import CardList from "../component/CardList";
import SearchBox from '../component/SearchBox';
import robots from '../component/robots';
import Scroll from '../component/Scroll';
import ErrorBoundry from '../component/ErrorBoundry';
import './App.css'     
       
     
     class App extends Component  {
       constructor() {
         super()
         this.state={
           robots:robots,
           searchfield:'',
         }
         
       }
       componentDidMount() {
         fetch('https://jsonplaceholder.typicode.com/users')
         .then(response=>{
          return response.json();
         })
         .then(users=> {this.setState({robots:users});
         })
       }
       onSearchChange = (event)=>  {
         this.setState({searchfield:event.target.value})  
        
       }
       render() {
        const {robots,searchfield} = this.state;
        const filterRobots= robots.filter(robot=>{
          return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !robots.length ?
        
         <h1>loading</h1>:
          (
          <div className='tc'>
           <h1 className='f1'>Robofriends</h1>
           <SearchBox searchChange={this.onSearchChange}/>
           <Scroll>
             <ErrorBoundry>
         <CardList robots={filterRobots}/>
          </ErrorBoundry>
         </Scroll>
        </div>   
         );
          }
        }     
     export default App;