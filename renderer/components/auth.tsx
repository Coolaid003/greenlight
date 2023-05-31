import React from 'react';
import Link from 'next/link';
import { ipcRenderer } from 'electron';

import Card from '../components/ui/card'
import Button from './ui/button';
import Loader from './ui/loader';

interface AuthProps {
  signedIn: boolean
  gamertag?: string
  gamerpic?: string
  gamerscore?: string
  isLoading?: boolean
}

function Auth({
  signedIn = false,
  gamertag,
  gamerpic,
  gamerscore,
  isLoading = false,
  ...props
}: AuthProps) {

  function startAuthFlow(){
    ipcRenderer.send('auth', {
      type: 'login',
    })
  }

  function logout(){
    if(confirm('Are you sure you want to logout?')){
      ipcRenderer.send('auth', {
        type: 'logout'
      })
    }
  }

  function clearData(){
    if(confirm('This will remove all application data. Sometimes helpful when you are stuck in a login loop. Do you want to continue?')){
      ipcRenderer.send('auth', {
        type: 'logout'
      })
    }
  }
  
  return (
    <React.Fragment>
        <div id="component_auth">

          <div id="component_auth_modal">
            { isLoading === false ? 
              <Card>
                {signedIn === true ? (<div className="component_auth_profile_container">
                  <div className="component_auth_profile_gamerpic">
                    <img src={ gamerpic } className="component_auth_profile_gamerpic_img" />
                  </div>

                  <div className="component_auth_profile_userdetails">
                    <h1>{ gamertag }</h1>
                    <p>
                      Gamerscore: { gamerscore }
                    </p>
                    {/* <p>
                      { 'Logging in...' }
                    </p> */}
                    <Button label="Login" className='btn-primary' onClick={ () => { startAuthFlow() } }></Button> &nbsp;
                    <Button label="Logout" className='btn' onClick={ () => { logout() } }></Button>
                  </div>

                </div>) : (<div style={{
                  textAlign: 'center',
                  paddingBottom: '20px'
                }}>
                  <h1>Login with Xbox</h1>
                  
                  <p>
                    Please authenticate below to access xCloud and xHome Streaming
                  </p>

                  <Button label="Login" className='btn-primary' onClick={ () => { startAuthFlow() } }></Button> &nbsp;
                  <Button label="Clear data" className='btn' onClick={ () => { clearData() } }></Button>
                </div>) }
              </Card>:<Card><div style={{
                textAlign: 'center'
              }}><Loader></Loader><br /></div></Card>
            }
          </div>
        </div>
    </React.Fragment>
  );
};

export default Auth;
