import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import CreateBook from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import Students from './pages/Students'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/books/create' element={<CreateBook />}/>
      <Route path='/books/details/:id' element={<ShowBook />}/>
      <Route path='/books/edit/:id' element={<EditBook />}/>
      <Route path='/books/delete/:id' element={<DeleteBook />}/>
      <Route path='/books/student/:id' element={<Students/>}></Route>
    </Routes>
  )
}

export default App


                        // if(log.returnTime){
                        //     var hours = log.returnTime.getHours();
                        //     var minutes = log.returnTime.getMinutes();
                        //     var seconds = log.returnTime.getSeconds();

                        //     // Format the time to ensure leading zeros if needed
                        //     hours = (hours < 10 ? "0" : "") + hours;
                        //     minutes = (minutes < 10 ? "0" : "") + minutes;
                        //     seconds = (seconds < 10 ? "0" : "") + seconds;

                        //     // Create a string representing the current time
                        //     var currentTime = hours + ":" + minutes + ":" + seconds;
                        // }