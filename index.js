/*Everything package related */
const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const axios = require('axios');
const app = express();
const port = 3000;

//env key
dotenv.config();

//Setting up ChatGPT 
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//read json and access public folder
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Connection to Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

//homepage 
app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

//Rental request for available rentals
app.get('/api/rentals', async (req, res) => {
  const { data, error } = await supabase.from('rentals').select('*');

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log('Recieved Data:', data.length);
    res.json(data);
  }
});

//saves customer inquiry form submission into DB
app.post('/api/inquiry', async (req, res) => {
  const {
    fullName,
    email,
    phone,
    eventDate,
    eventType,
    message,
  } = req.body;

  const { data, error } = await supabase
    .from('inquiries')
    .insert([
        {
          full_name: fullName,
          email: email,
          phone: phone,
          event_date: eventDate,
          event_type: eventType,
          message: message,
        },
    ])
    .select();

    if (error) {
      res.status(500).json(error);
    } else {
      res.json(data);
    }
});

//Get holiday from Calendarific API
app.get('/api/holiday', async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const response = await axios.get('https://calendarific.com/api/v2/holidays', {
      params: {
        api_key: process.env.CALENDARIFIC_API_KEY,
        country: 'US',
        year: currentYear,
        month: currentMonth,
      },
    });

    const holidays = response.data.response.holidays;

    if (!holidays || holidays.length === 0) {
      return res.json({
        name: 'No major holiday found this month',
        date: '',
      });
    }

    const today = new Date();

    const upcomingHoliday = holidays.find((holiday) => {
      const holidayDate = new Date(holiday.date.iso);
      return holidayDate >= today;
    });

    res.json(upcomingHoliday || holidays[0]);
  } catch (error) {
    console.error('Calendarific error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch holiday',
    });
  }
});

//Checks Phone number and confirm its valid
app.get('/api/validate-phone', async (req, res) => {
  try {
    const phone = req.query.phone;

    const response = await axios.get('http://apilayer.net/api/validate', {
      params: {
        access_key: process.env.NUMVERIFY_API_KEY,
        number: phone,
        country_code: 'US',
        format: 1,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Numverify error:', error.message);
    res.status(500).json({
      error: 'Failed to validate phone number',
    });
  }
});

//Takes holiday and send prompt to ChatGPT to create a party pitch for that holiday
app.post('/api/pitch', async (req, res) => {
  try {
    const { holiday } = req.body;

    const prompt = `
      Create a short and friendly party rental sales pitch based on this holiday: ${holiday}.

      Suggest how a client could celebrate this holiday using party rentals such as:
      theme color for chairs, tables, and balloons. Also maybe a detailed description of backdrops or table center piece that would capitvate guest.
        If the holiday date is this week or soon, your suggestion should lean towards simple but still festive. 
      Keep it under 3 sentences.
      Make it sound inviting, simple, and professional. 
    `;

    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
    });

    res.json({
      pitch: response.output_text,
    });
  } catch (error) {
    console.error('OpenAI error:', error.message);

    res.status(500).json({
      error: 'Failed to generate party pitch',
    });
  }
});

//Server start
app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});
