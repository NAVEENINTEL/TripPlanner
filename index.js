const axios = require('axios');

// Function to send a message to ChatGPT API and receive a response
async function sendMessage(message) {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'You are a professional travel planner.' }, { role: 'user', content: message }],
  }, {
    headers: {
      'Authorization': 'Bearer API-KEY',
      'Content-Type': 'application/json',
    },
  });

  const reply = response.data.choices[0].message.content;
  return reply;
}

// Function to prompt the user and get their response
async function getUserResponse(prompt) {
  console.log(prompt);
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    readline.question('> ', (answer) => {
      readline.close();
      resolve(answer);
    });
  });
}

// Function to ask questions and plan a low-budget trip
async function planLowBudgetTrip() {
  console.log('Welcome to the Low-Budget Trip Planner!');

  const startingPoint = await getUserResponse('Enter your starting point: ');
  const destination = await getUserResponse('Enter your destination: ');
  const numDays = await getUserResponse('Enter the number of days for the trip: ');
  const numPeople = await getUserResponse('Enter the total number of people travelling: ');
  const prompt="";

  console.log('Planning your trip...');
  // const message = `Plan a low-budget trip from ${startingPoint} to ${destination} for ${numDays} days with ${numPeople} people.`;
  const message = `Now you are a professional traveller. Give a full plan for  visiting  ${destination} from ${startingPoint} for ${numDays} days with ${numPeople} people.Guide me travelling options with timings,price,names.  Also caluclate budget for travelling, accomodation,food. Near by places to visit and details. Plan whole trip and show full detail like timings,prices,links to book in advance.Plan in low budget. Say like a guided story `;
  const response = await sendMessage(message);
  console.log('Trip details:');
  console.log(response);

  console.log('\nLet me be your storyteller and guide you through the wonderful places you will visit.');

  const guideMessage = await sendMessage(`Tell me more about the attractions and highlights of ${destination}.`);
  console.log('\nSit back and imagine yourself on this incredible journey with friends. Here is the story of your trip to ' + destination + ':');
  console.log(guideMessage);

  console.log('\nI hope you enjoyed the story and have an unforgettable trip!');
}

//   console.log('Planning your trip...');
//   const message = `Plan a low-budget trip from ${startingPoint} to ${destination} for ${numDays} days with ${numPeople} people.`;
//   const response = await sendMessage(message);

//   console.log('Trip details:');
//   console.log(response);

//   console.log('\nLet me be your professional guide and share some stories about the places you will be visiting.');

//   // Start the guide's storytelling based on the trip details
//   const guideMessage = await sendMessage(`Tell me more about the highlights and attractions of ${destination}.`);
//   console.log(guideMessage);

//   console.log('\nI hope you enjoyed the stories and have a wonderful trip!');
// }

//   const message = `Plan a low-budget trip from ${startingPoint} to ${destination} for ${numDays} days with ${numPeople} people.`;
//   const response = await sendMessage(message);

//   console.log('Trip details:');
//   console.log(response);
// }

// Call the main function to start the trip planning process
planLowBudgetTrip();
