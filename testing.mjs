const d = new Date()

const newTime = d.toLocaleTimeString()
const hours = d.getHours();
const minutes = d.getMinutes();

const sampleData = [
    {
        name: "flynn yee",
        year: "2Y",
        time: "20:00:01"
    },
]

const getStatus = (time) => {
    const [hours, minutes, ms] = time.split(':').map(Number);

    if ((hours === 7 && minutes >= 0) || (hours === 8) || (hours === 9 && minutes === 0)) {
        return "Morning In";
    } else if ((hours === 11 && minutes >= 30) || (hours === 12 && minutes <= 40)) {
        return "Morning Out";
    }else if ((hours === 12 && minutes >= 50) || (hours === 13) || (hours === 14)) {
        return "Afternoon In";
    } else if ((hours === 16 && minutes >= 30) || (hours === 17) || (hours === 18) || (hours === 19) || (hours === 20 && minutes <= 0)) {
        return "Afternoon Out";
    } else {
        return "Neither In nor Out";
    }
};

sampleData.forEach((entry) => {
    const status = getStatus(entry.time);
    console.log(`Name: ${entry.name}, Time: ${entry.time}, Status: ${status}`);
});