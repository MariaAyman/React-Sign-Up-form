import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';

function App() {
  //update state and check for errors
  const [form, setForm] = useState({}); //the form state
  const [errors, setErrors] = useState({}); //the errors state

  //the form object will hold a key-value pair for every form feild so is the error

  //to update state of the form, keep all curr form values and add the newest to the right key location
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })

    //reset error fields
    //if errors exist, remove them from error object
    if(!!errors[field]) setErrors({
      ...errors,
      [field]: null
    })
  };

  //checking for errors on submit
  /*Errors examples
  *Blank/Null values
  *Names must be less than 15 characters
  *Email format is correct
  *Password must be 8-20 characters long, 
              contain letters and numbers, 
              and must not contain spaces, special characters, or emoji*/

  const findFormErrors = () => {
    const {firstName, lastName, email, password, check} = form;
    const newErrors = {};

    //name errors
    if(!firstName || firstName === '') newErrors.firstName = 'Cannot be Blank!';
    else if(!firstName.match(/^[A-Z][a-zA-Z]{2,15}/g)) newErrors.firstName = 'First Name is too long! Or First Name is not valid (valid name ex. John or Mary)';
    
    if(!lastName || lastName === '') newErrors.lastName = 'Cannot be Blank!';
    else if(!lastName.match(/^[A-Z][a-zA-Z]{2,15}/g)) newErrors.lastName = 'Last Name is too long! Or Last Name is not valid (valid name ex. Smith or Bunce)';

    //email errors
    if(!email || email === '') newErrors.email = 'Must Enter an Email to Sign Up!';
    else if(!email.match(/^[\w-_.]+@([\w-]+.)+[\w-]{2,4}$/g)) newErrors.email = 'Please enter a valid Email address!';

    //password errors
    if(!password || password === '') newErrors.password = 'Must Enter a Password to Sign Up!';
    else if(!password.match(/[a-zA-Z0-9]{8,20}$/g)) newErrors.password = 'Please enter a valid Password!';

    //check box 
    if(!check) newErrors.check = 'You must agree before signing up!';

    return newErrors;
  };

  //handling submit
  const handleSubmit = e => {
    //prevent default action for a form
    e.preventDefault();
    //get new errors
    const newErrors = findFormErrors();
    if(Object.keys(newErrors).length > 0) setErrors(newErrors); //we got errors
    else alert('Sign Up is Done!'); //no errors
  };

  return (
    <Container className="w-75 mx-auto my-4 border border-primary rounded p-0">
      <Header/>
      <Form className="d-flex flex-column my-4 px-4">
        <Form.Group controlId="formGroupName">
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' 
                            placeholder="First name" 
                            onChange={ e => setField('firstName', e.target.value) }
                            isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" 
                            placeholder="Last name" 
                            onChange={ e => setField('lastName', e.target.value) }
                            isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" 
                        placeholder="Enter email" 
                        onChange={ e => setField('email', e.target.value) }
                        isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" 
                        placeholder="Password" 
                        id="inputPassword5" 
                        aria-describedby="passwordHelpBlock" 
                        onChange={ e => setField('password', e.target.value) }
                        isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          <Form.Text id="passwordHelpBlock" muted>
            Your Password must be 8-20 characters long, 
            contain letters and numbers, 
            and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" 
                      label="Agree to terms and conditions"
                      onChange={ e => setField('check', e.target.value) }
                      isInvalid={!!errors.check}
          />
          <Form.Control.Feedback type="invalid">{errors.check}</Form.Control.Feedback>
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit" className="align-self-center btn-lg" >
          Sign Up
        </Button>
      </Form>
    </Container>  
  );
}

export default App;
