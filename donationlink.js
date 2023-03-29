import React, { useState } from 'react';
import './App.css';

function App() {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');
  
  const [cardHolderNameError, setCardHolderNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expirationDateError, setExpirationDateError] = useState('');
  const [cvcError, setCvcError] = useState('');
  

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    if (!validateCardHolderName(cardHolderName)) {
      setCardHolderNameError('Your name');
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      setCardNumberError('Your card number');
      return;
    }

    if (!validateExpirationDate(expirationDate)) {
      setExpirationDateError('Expiration date');
      return;
    }

    if (!validateCvc(cvc)) {
      setCvcError('CVC code');
      return;
    }

    
    // Send the form data to the backend server
    fetch('/donate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cardHolderName: cardHolderName,
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvc: cvc
      })
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      // Clear the form fields after successful submission
      setCardHolderName('');
      setCardNumber('');
      setExpirationDate('');
      setCvc('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  
  const validateCardHolderName = (name) => {
    return /^[a-zA-Z ]+$/.test(name);
  }

  const validateCardNumber = (number) => {
    return /^[0-9]{16}$/.test(number);
  }

  const validateExpirationDate = (date) => {
    const [month, year] = date.split('/');
    const now = new Date();
    const expiration = new Date(parseInt(`20${year}`, 10), parseInt(month, 10) - 1, 1);
    return expiration > now;
  }

  const validateCvc = (cvc) => {
    return /^[0-9]{3}$/.test(cvc);
  }

  

  return (
    <body>
    <div>
<div className="first_page">

  <h1>Energiser Donation Page</h1>
  
 </div>
 <div className="mission">
  <h3> Our Mission: </h3>  
</div>
<div>
<div class="card">
  <h2 className='welcome'> At Affordable Energy Saving, our mission is to empower students to take control of their energy consumption and reduce their energy costs. We believe that by providing an interactive system that offers various ways to save energy, students can make a significant impact on the environment and their wallet. </h2>
  </div>
  <div class="card">
<h4 className= "head1">Through our platform, we aim to educate and inform students about the benefits of energy efficiency and how small changes in their daily routines can make a big difference. We want to help students understand their energy consumption and provide them with accessible tools to manage it effectively.</h4>
</div>
<div class="card">
<h5 className= "head2">Our goal is to create a community of energy-conscious individuals who are committed to reducing their carbon footprint and promoting sustainable living. We believe that by working together, we can make a positive impact on the environment and create a better future for all.</h5>
</div>
 </div>

       <form onSubmit={handleSubmit}>
        
        <h2>Donation Form</h2>

        <div className='subscribe'>
          <p>Please Select one: </p>
          </div>
        <select name="package" id="package">
          <option value="month">Monthly</option>
          <option value="one_off">Single</option>
        </select>
       

  <div className='carddetails'><p> Please Your Card Details: </p></div>

        
        <div className="form-group">
          <label htmlFor="cardHolderName">Card Holder Name:</label>
          <input type="text" className="form-control" id="cardHolderName" placeholder="Enter Full Name" required value={cardHolderName} onChange={event =>{ setCardHolderName(event.target.value);
          setCardHolderNameError('');
          }} />
          {cardHolderNameError && <div className="error-message">{cardHolderNameError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" className="form-control" id="cardNumber" placeholder='Enter Your 16 Digit Card Number' pattern="[0-9]{16}" required value={cardNumber} onChange={event =>{ setCardNumber(event.target.value);
          setCardNumberError('');
        }} />
        {setCardNumberError && <div className="error-message">{cardNumberError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input type="text" className="form-control" id="expirationDate" placeholder='MM/YY' pattern="^(0[1-9]|1[0-2])\/\d{2}$" required value={expirationDate} onChange={event =>{ setExpirationDate(event.target.value);
          setExpirationDateError('');
        }} />
        {setExpirationDateError && <div className="error-message">{expirationDateError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC:</label>
          <input type="text" className="form-control" id="cvc" placeholder="Enter 3 Digit CVC"pattern="[0-9]{3}" required value={cvc} onChange={event => {setCvc(event.target.value);
          setCvcError('');
        }} />
        {setCvcError && <div className="error-message">{cvcError}</div>}
        </div>
<p className='donate__amount'>Please Select The Amount: </p>
        <select className='amount'>
          <option value="five">10 Pounds</option>
          <option value="ten">20 Pounds</option>
          <option value="twenty">50 Pounds</option>
          
        </select>
        <button type="submit" className="btn btn-primary">Donate Now</button>
        <div class="cards">
  <div class="card">
    
    <p className='card__header'>Why you will donate?</p>
    <p class="card__description">Affordable Energy Saving's focus on empowering students to take control of their energy consumption and reduce their energy costs can be appealing if you value education and want to support initiatives that help young people develop important life skills.</p>
    <button className='card__btn'>Read More</button>
  </div>
  <div class="card">
    
    <p className='card__header'>Why this donation is important?</p>
    <p class="card__description">Your donation can help us improve and maintain our platform, provide valuable education and resources to students, and reach more individuals who are committed to reducing their carbon footprint. This can have a positive impact on the environment, as well as the wallets of students who may be struggling to manage their energy costs.</p>
    <button className='card__btn'>Read More</button>
  </div>
  <div class="card">
    
    <p className='card__header'>What will be the impact for this donation?</p>
    <p class="card__description">Your donation can help us create a community of energy-conscious individuals who are committed to reducing their carbon footprint and promoting sustainable living. By working together, we can make a real difference in addressing the issue of energy waste in the community.</p>
    <button className='card__btn'>Read More</button>
  </div>
 
</div>
<body>
  
  <p className = 'social'>Follow us on our social channels </p>
  <div class="card"> <p><a href="https://www.facebook.com/"> Facebook</a></p></div>
  <div class="card"> <p><a href="https://www.twitter.com/">Twitter</a></p></div>
  <div class="card"> <p><a href="https://www.linkedIn.com/">LinkedIn</a></p></div>
  <div class="card"> <p><a href="https://www.youtube.com/">Youtube</a></p></div>
  <div class="card"> <p><a href="https://www.github.com/">GitHub</a></p></div>
</body> 
      </form>
      </div>
      </body>
  );
  
}

export default App;