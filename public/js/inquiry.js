//When user submits, check phone number and send info to Supabase
const form = document.getElementById("inquiryForm");
form.addEventListener("submit", async (event) => {
  
  //This is to prevent the page from refreshing when submitting the form
  event.preventDefault();

  //Phone number value
  const phone = document.getElementById("phone").value;
  
  //place to add feedback to user
  const statusMessage = document.getElementById("statusMessage");

  //Waiting message for 
  statusMessage.innerText = "Checking your phone number - One moment please";

  //Pass off phone # to api and gets response
  const phoneResponse = await fetch(`/api/validate-phone?phone=${phone}`);
  const phoneData = await phoneResponse.json();

  //If invalid, tells user its fake
  if (phoneData.valid == false) {
    statusMessage.innerText = "Please enter a valid phone number.";
    return;
  }

  //Collects everything and pass to backend to add to DB
  const inquiryData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: phone,
    eventDate: document.getElementById("eventDate").value,
    eventType: document.getElementById("eventType").value,
    message: document.getElementById("message").value,
  };

  const response = await fetch("/api/inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inquiryData),
  });

  //I added this as checkpoint/debug lol
  const result = await response.json();
  console.log(result);

  statusMessage.innerText = "Inquiry submitted successfully!";
  form.reset();
});