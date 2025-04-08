const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();

const knowledgeBase = {
  "platform": "We have 6 platforms. Platforms 1-3: Local trains, 4-6: Express trains.",
  "ticket": "Buy tickets at counters (5AM-11PM), vending machines (24/7), or via our app.",
  "parking": "Parking rates: ₹20/hour (cars), ₹10/hour (bikes). Free for first 30 mins.",
  "timing": "Station operates 24/7. Ticket counters: 5AM-11PM daily.",
  "lost": "Lost & Found office near Platform 1 (8AM-8PM). Contact: 022-12345678",
  "wifi": "Free WiFi available in waiting halls. Network: 'RailWire', Password: 'TrackEase123'"
};

router.get('/', (req, res) => {
    res.render('chatbot/index'); 
    // Make sure this matches your EJS file path
  });

  router.post('/ask', (req, res) => {
    try {
      console.log('Received question:', req.body); // Debug log
      
      const question = req.body.question?.toLowerCase() || "";
      let answer = "I can help with express trains, tickets, or platform info.";
  
      Object.entries(knowledgeBase).forEach(([key, response]) => {
        if (question.includes(key)) answer = response;
      });
  
      res.json({ answer });
    } catch (err) {
      console.error('Error in chatbot:', err);
      res.status(500).json({ answer: "System error occurred." });
    }
  });

module.exports = router;