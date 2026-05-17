//This function loads all the rental items and displays them on the page
async function loadRentals() {
  console.log('loadRentals running');

  //Gets the rental data from backend API to supabase
  const response = await fetch('/api/rentals');
  const rentals = await response.json();

  console.log('rentals:', rentals);

  //Selects the container to add the cards
  const container = document.getElementById('rentalsContainer');

  //For every rental item, it creates a div, add its info, price, pic and append to container
  rentals.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('rental-card');
    card.setAttribute('data-aos', 'fade-up');
    card.innerHTML = `
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <p><strong>${item.price_daily}</strong></p>
      <img src="rental_pics/${item.picture_name}.png">
    `;
    container.appendChild(card);
  });
}
//run the function when page load
window.onload = loadRentals;