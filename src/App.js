import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route} from "react-router-dom";


const App = (props) => {

  return (
      <div className='app-wrapper'>
        <Header/>
        <Navbar/>
        <div className='app-wrapper-content'>
          <Route path='/profile' render={ () => <Profile profilePage={props.store._state.profilePage}
                                                         addPost={props.store.addPost}
                                                         newPostText={props.store._state.profilePage.newPostText}
                                                         updateNewPostText={props.store.updateNewPostText}
          /> } />
          <Route path='/dialogs' render={ () => <Dialogs state={props.store._state.dialogsPage}
                                                         addMessage={props.store.addMessage}
                                                         updateNewMessageText={props.store.updateNewMessageText}
                                                         newMessageText={props.store._state.dialogsPage.newMessageText} /> } />
          <Route path='/news' render={ () => <News />} />
          <Route path='/music' render={ () => <Music />} />
          <Route path='/settings' render={ () => <Settings />} />
        </div>
      </div>
  );
}


export default App;
