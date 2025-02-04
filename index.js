const { Telegraf } = require("telegraf");
const schedule = require("node-schedule");
require("dotenv").config();
const fs = require("fs");

const bot = new Telegraf(process.env.BOT_TOKEN);
const userId = process.env.USER_ID; // Replace with your Telegram ID or keep in .env file
const startDate = new Date(process.env.START_DATE); // Read start date from .env file

const relaxationPlan = {
  week1: {
    morning: "Diaphragmatic Breathing (5 min) + Stretching & Mobility (5 min)",
    midday: "Progressive Muscle Relaxation (5 min)",
    evening:
      "Body Scan Meditation (5 min) + Sighing Breath (5 min) + Journal Reflection (5 min)",
  },
  week2: {
    morning: "Box Breathing (5 min) + Gentle Yoga Flow (10 min)",
    midday: "Shake Out Stress (2 min) + Visualization (3 min)",
    evening:
      "Self-Massage (5 min) + Guided Imagery (5 min) + Relaxing Breathwork (5 min)",
  },
  week3: {
    morning:
      "Cold Exposure & Breath Control (5 min) + Tai Chi or Qigong (10 min)",
    midday: "Verbal Stress Exercise (5 min) + Mantra & Affirmations (5 min)",
    evening: "PMR + Body Scan Combo (10 min) + Mindful Walking (5 min)",
  },
  week4: {
    morning: "Eyes-Closed Stress Training (5 min) + Yoga & Mobility (10 min)",
    midday: "Tension Awareness Drill (Throughout the Day)",
    evening: "Self-Reflection (5 min) + Deep Relaxation Routine (10 min)",
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const getCurrentWeek = () => {
  const now = new Date();
  const weeksElapsed =
    Math.floor((now - startDate) / (1000 * 60 * 60 * 24 * 7)) + 1;
  return `week${Math.min(weeksElapsed, 4)}`;
};

const scheduleMessages = async () => {
  const week = getCurrentWeek();

  schedule.scheduleJob({ hour: 8, minute: 0 }, async () => {
    await bot.telegram.sendMessage(
      userId,
      `🌞 Morning Routine: ${relaxationPlan[week].morning}`,
    );
    sleep(2000);
    await bot.telegram.sendMessage(
      userId,
      "💡 Explanation: Start with deep diaphragmatic breathing, focusing on slow inhales and exhales. Then, do gentle stretches to loosen up your body and release tension.",
    );
  });

  schedule.scheduleJob({ hour: 12, minute: 0 }, async () => {
    await bot.telegram.sendMessage(
      userId,
      `🌤 Midday Routine: ${relaxationPlan[week].midday}`,
    );
    sleep(2000);
    await bot.telegram.sendMessage(
      userId,
      "💡 Explanation: Progressive Muscle Relaxation helps you release stress. Tense and relax each muscle group, starting from your hands and working up to your shoulders and jaw.",
    );
  });

  schedule.scheduleJob({ hour: 20, minute: 0 }, async () => {
    await bot.telegram.sendMessage(
      userId,
      `🌙 Evening Routine: ${relaxationPlan[week].evening}`,
    );
    sleep(2000);
    await bot.telegram.sendMessage(
      userId,
      "💡 Explanation: Wind down with a body scan meditation to notice and release residual tension. Follow up with sighing breath for deeper relaxation, and reflect in your journal about moments of stress and how you handled them today.",
    );
  });
};
(async () => {
  await bot.telegram.sendMessage(
    userId,
    "📢 Relaxation bot has started! Your regimen is now active.",
  );
  sleep(2000);
  await bot.telegram.sendMessage(
    userId,
    "💡 Explanation: You will receive daily reminders with your relaxation exercises, along with a brief explanation to guide your practice.",
  );
})();

scheduleMessages();
bot
  .launch()
  .then(() => console.log("Bot is running and messages are scheduled."));
