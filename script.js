
const timeZone = "Asia/Tashkent";

const elements = {
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  milliseconds: document.getElementById("milliseconds"),
  microseconds: document.getElementById("microseconds"),
  nanoseconds: document.getElementById("nanoseconds"),
  date: document.getElementById("date")
};

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23"
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone,
  day: "2-digit",
  month: "numeric",
  year: "numeric"
});

const months = [
  "YANVAR",
  "FEVRAL",
  "MART",
  "APREL",
  "MAY",
  "IYUN",
  "IYUL",
  "AVGUST",
  "SENTABR",
  "OKTABR",
  "NOYABR",
  "DEKABR"
];

function updateClock() {
  const now = new Date();

  // Makka vaqti
  const timeParts = timeFormatter.formatToParts(now);
  const time = {};

  for (const part of timeParts) {
    if (part.type !== "literal") {
      time[part.type] = part.value;
    }
  }

  elements.hours.textContent = time.hour;
  elements.minutes.textContent = time.minute;
  elements.seconds.textContent = time.second;

  // Millisekund
  const ms = now.getMilliseconds();

  elements.milliseconds.textContent =
    String(ms).padStart(3, "0");

  // Animatsion mikrosekund va nanosekund
  const fraction = performance.now() % 1;
  const microseconds = Math.floor(fraction * 1000);

  const nanoseconds = Math.floor(
    (fraction * 1000 - microseconds) * 1000
  );

  elements.microseconds.textContent =
    String(microseconds).padStart(3, "0");

  elements.nanoseconds.textContent =
    String(nanoseconds).padStart(3, "0");

  // To'liq sana: kun : oy : yil
  const dateParts = dateFormatter.formatToParts(now);
  const date = {};

  for (const part of dateParts) {
    if (part.type !== "literal") {
      date[part.type] = part.value;
    }
  }

  const monthNumber = Number(date.month);
  const monthName = months[monthNumber - 1];

  elements.date.textContent =
    `${date.day} : ${monthName} : ${date.year}`;

  requestAnimationFrame(updateClock);
}

updateClock();
