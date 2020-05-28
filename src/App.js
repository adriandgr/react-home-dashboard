import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import GridLoader from "react-spinners/GridLoader";
import api from './utils/api';

import {
  Avatar, Box, Button, Collapsible,FormField,Form,Grommet,Heading,
  Layer,Nav,ResponsiveContext,Sidebar,TextInput, Text
} from 'grommet';
import { FormClose, Notification, Home, Help, Login, Projects, Clock, StatusGood } from 'grommet-icons';

const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
      gradient:  "url(https://blog.hdwallsource.com/wp-content/uploads/2014/11/gradient-26052-26737-hd-wallpapers.jpg.png)",
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};


const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

const LoginForm = () => {
  const defaultState = {
    email: ''
  }
  const [value, setValue] = React.useState(defaultState);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const sendMagicLinkg = ({value}) => {
    setEmailError('')
    setLoading(true)
    api.magicLink(value.email).then((res) => {
      if (res.errors) {
        const e = res.errors.filter(e => e.param === 'email')[0]
        setEmailError(e.msg)
        console.log('errr')
        resetLoading()
      } else {
        console.log(res)
        setLoading(false)
        setSuccess(true)
      }
      
    }).catch((err,m) => {
      console.log(err, m)
    });
  }
  
  const resetLoading = () => {
    console.log("trigger")
    setSuccess(false)
    setLoading(false)
  };
  return (
    <Box 
    direction='column' 
    align='center' 
    background='white' 
    elevation='medium'
    height={{"min":"250px"}}
    width={{"min":"medium"}}
    round='medium'>
      <Heading level='3' margin='1em'><Login /> &nbsp; Login</Heading>
      {!(success || loading)
      ? <Form
        value={value || {}}
        onChange={nextValue => setValue(nextValue)}
        onReset={() => {setValue(defaultState); setEmailError('')}}
        onSubmit={sendMagicLinkg}
      >
        
      <FormField name="email" error={emailError} htmlfor="text-input-id" required={true}>
        <TextInput id="text-input-id" name="email" placeholder="your email" />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Send magic link" />
        <Button type="reset" label="Reset" />
      </Box>
      
      {/* <TextInput placeholder="your email" value={value} onChange={event => setValue(event.target.value)} /> */}
    </Form> 
   : (!success ? <GridLoader
          css={override}
          size={20}
          color={"#4A90E2"}
          loading={loading}
        /> 
        : <>
        <StatusGood size='xlarge' color='green' />
        <Text size='medium' margin='10px'> Please check your inbox for a login link </Text>
        
        </>) }
    </Box>
    
  );
}


class App extends Component {
  state = {
    showSidebar: false,
  }
  render() {
    const { showSidebar } = this.state;
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill background='gradient'>
              
              <AppBar>
               
                <Heading level='3' margin='none'><Home /> Dalhousie Base</Heading>
                <Button
                  icon={<Notification />}
                  onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}
                />
              </AppBar>
              <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
             
                <Box flex align='center' justify='center'>
                  {/* APP BODY */}
                  <LoginForm/>
                </Box>
                {(!showSidebar || size !== 'small') ? (
                  <Collapsible direction="horizontal" open={showSidebar}>
                    <Box
                      flex
                      width='medium'
                      background='light-2'
                      elevation='small'
                      align='center'
                      justify='center'
                    >
                      sidebar
                    </Box>
                  </Collapsible>
                ): (
                  <Layer>
                    <Box
                      background='light-2'
                      tag='header'
                      justify='end'
                      align='center'
                      direction='row'
                    >
                      <Button
                        icon={<FormClose />}
                        onClick={() => this.setState({ showSidebar: false })}
                      />
                    </Box>
                    <Box
                      fill
                      background='light-2'
                      align='center'
                      justify='center'
                    >
                      sidebar
                    </Box>
                  </Layer>
                )}
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;