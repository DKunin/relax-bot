const { Telegraf } = require('telegraf');
const schedule = require('node-schedule');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const userId = process.env.USER_ID; // Replace with your Telegram ID or keep in .env file

const relaxationPlan = {
    week1: {
        morning: "Diaphragmatic Breathing (5 min) + Stretching & Mobility (5 min)",
        midday: "Progressive Muscle Relaxation (5 min)",
        evening: "Body Scan Meditation (5 min) + Sighing Breath (5 min) + Journal Reflection (5 min)"
    },
    week2: {
        morning: "Box Breathing (5 min) + Gentle Yoga Flow (10 min)",
        midday: "Shake Out Stress (2 min) + Visualization (3 min)",
        evening: "Self-Massage (5 min) + Guided Imagery (5 min) + Relaxing Breathwork (5 min)"
    },
    week3: {
        morning: "Cold Exposure & Breath Control (5 min) + Tai Chi or Qigong (10 min)",
        midday: "Verbal Stress Exercise (5 min) + Mantra & Affirmations (5 min)",
        evening: "PMR + Body Scan Combo (10 min) + Mindful Walking (5 min)"
    },
    week4: {
        morning: "Eyes-Closed Stress Training (5 min) + Yoga & Mobility (10 min)",
        midday: "Tension Awareness Drill (Throughout the Day)",
        evening: "Self-Reflection (5 min) + Deep Relaxation Routine (10 min)"
    }
};

const getCurrentWeek = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Starts tomorrow
    const currentWeek = Math.ceil(((new Date() - startDate) / (1000 * 60 * 60 * 24)) / 7) + 1;
    return `week${Math.min(currentWeek, 4)}`;
};

const scheduleMessages = () => {
    const week = getCurrentWeek();
    
    schedule.scheduleJob({ hour: 8, minute: 0 }, () => {
        bot.telegram.sendMessage(userId, `🌞 Morning Routine: ${relaxationPlan[week].morning}`);
    });
    
    schedule.scheduleJob({ hour: 12, minute: 0 }, () => {
        bot.telegram.sendMessage(userId, `🌤 Midday Routine: ${relaxationPlan[week].midday}`);
    });
    
    schedule.scheduleJob({ hour: 20, minute: 0 }, () => {
        bot.telegram.sendMessage(userId, `🌙 Evening Routine: ${relaxationPlan[week].evening}`);
    });
};

scheduleMessages();
bot.launch().then(() => console.log('Bot is running and messages are scheduled.'));