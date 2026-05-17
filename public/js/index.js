//Function to get the holiday from Calendarific API
async function loadHolidayAndPitch() {
  //Getting holiday data
  const holidayResponse = await fetch("/api/holiday");
  const holiday = await holidayResponse.json();

  //Debug tool
  console.log(holiday);

  //Selecting the div where to add holiday
  const holidayBox = document.getElementById("holidayBox");
  
  //Selecting the div where to add chatGPT output from API
  const pitchText = document.getElementById("pitchText");

  //This returns the date, convert and extract the day and month only
  const holiday_date = holiday.date.iso;
  const date = new Date(holiday_date);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  //Sends the holiday to backend to generate the holiday pitch
  const pitchResponse = await fetch("/api/pitch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      holiday: holiday.name,
    }),
  });

  //Converts the response into JSON format
  const pitchData = await pitchResponse.json();

  //Paste the holiday information I want to display on the website
  holidayBox.innerHTML = `
      <h1>Looking For a Reason To Party?🎊</h1>
      <h2>${month} ${day} is ${holiday.name}!</h2>
    `;
  //paste the AI pitch underneath
  pitchText.innerText = pitchData.pitch;
}

//Sets up the fade effect on hero section(big logo on page)
function setupHeroFade() {
  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", function () {
    let scrollAmount = window.scrollY;
    let fade = 1 - scrollAmount / 500;

    hero.style.opacity = fade;
  });
}

//Selects all swiper and sets all of them to loop
const swipers = document.querySelectorAll(".small-swiper");
swipers.forEach((swiperEl) => {
  new Swiper(swiperEl, {
    loop: true,
    autoplay: {
      delay: 3000,
    },
  });
});

//runs the function
window.onload = () => {
  loadHolidayAndPitch();
  setupHeroFade();
};
