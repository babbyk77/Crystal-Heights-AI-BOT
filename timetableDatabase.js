// timetableDatabase.js

const timetableDatabase = {
  // Pre-School Timetable (Expanded with more activities)
  preschool: {
    title: "Pre-School Timetable",
    schedule: [
      { time: "7:30 - 8:00", activity: "Early Drop-off & Free Play" },
      { time: "8:00 - 8:30", activity: "Morning Circle (Greetings, Weather, Calendar)" },
      { time: "8:30 - 9:00", activity: "Phonics & Letter Recognition" },
      { time: "9:00 - 9:30", activity: "Numeracy & Counting Activities" },
      { time: "9:30 - 10:00", activity: "Outdoor Play & Gross Motor Skills" },
      { time: "10:00 - 10:30", activity: "Snack Time & Social Development" },
      { time: "10:30 - 11:00", activity: "Theme Learning (Weekly Topics)" },
      { time: "11:00 - 11:30", activity: "Creative Arts & Crafts" },
      { time: "11:30 - 12:00", activity: "Story Time & Language Development" },
      { time: "12:00 - 12:30", activity: "Lunch & Table Manners" },
      { time: "12:30 - 1:00", activity: "Quiet Time/Nap Time" },
      { time: "1:00 - 1:30", activity: "Sensory Play & Exploration" },
      { time: "1:30 - 2:00", activity: "Music & Movement" },
      { time: "2:00 - 2:30", activity: "Closing Circle (Review, Show & Tell)" },
      { time: "2:30 - 2:45", activity: "Dismissal Preparation" },
      { time: "2:45 - 3:15", activity: "After-School Care (Optional)" }
    ]
  },

  // Grade 1 Timetable
  grade1: {
    title: "Grade 1 Timetable",
    schedule: [
      { time: "8:00 - 8:30", activity: "Morning Assembly" },
      { time: "8:30 - 9:10", activity: "English Language" },
      { time: "9:10 - 9:50", activity: "Mathematics" },
      { time: "9:50 - 10:10", activity: "Break Time" },
      { time: "10:10 - 10:50", activity: "Integrated Science" },
      { time: "10:50 - 11:30", activity: "Phonics" },
      { time: "11:30 - 12:10", activity: "Creative Arts" },
      { time: "12:10 - 12:50", activity: "Lunch" },
      { time: "12:50 - 1:30", activity: "Ghanaian Language" },
      { time: "1:30 - 2:10", activity: "Story Time" },
      { time: "2:10 - 2:45", activity: "Physical Education" }
    ]
  },

  // Grade 2 Timetable
  grade2: {
    title: "Grade 2 Timetable",
    schedule: [
      { time: "8:00 - 8:30", activity: "Morning Assembly" },
      { time: "8:30 - 9:10", activity: "English Language" },
      { time: "9:10 - 9:50", activity: "Mathematics" },
      { time: "9:50 - 10:10", activity: "Break Time" },
      { time: "10:10 - 10:50", activity: "Integrated Science" },
      { time: "10:50 - 11:30", activity: "Reading Comprehension" },
      { time: "11:30 - 12:10", activity: "Social Studies" },
      { time: "12:10 - 12:50", activity: "Lunch" },
      { time: "12:50 - 1:30", activity: "Ghanaian Language" },
      { time: "1:30 - 2:10", activity: "Religious & Moral Education" },
      { time: "2:10 - 2:45", activity: "Music" }
    ]
  },

  // Continue with all other grades following the same pattern...
  grade3: {
    title: "Grade 3 Timetable",
    schedule: [
        { time: "8:00 - 8:30", activity: "Morning Assembly" },
      { time: "8:30 - 9:10", activity: "English Language" },
      { time: "9:10 - 9:50", activity: "Mathematics" },
      { time: "9:50 - 10:10", activity: "Break Time" },
      { time: "10:10 - 10:50", activity: "Integrated Science" },
      { time: "10:50 - 11:30", activity: "Reading Comprehension" },
      { time: "11:30 - 12:10", activity: "Social Studies" },
      { time: "12:10 - 12:50", activity: "Lunch" },
      { time: "12:50 - 1:30", activity: "Ghanaian Language" },
      { time: "1:30 - 2:10", activity: "Religious & Moral Education" },
      { time: "2:10 - 2:45", activity: "Music" }
      // Similar structure with grade-appropriate subjects
    ]
  },
  grade4: {
    title: "Grade 4 Timetable",
    schedule: [
      // Similar structure with grade-appropriate subjects
    ]
  },
  grade5: {
    title: "Grade 5 Timetable",
    schedule: [
      // Similar structure with grade-appropriate subjects
    ]
  },
  grade6: {
    title: "Grade 6 Timetable",
    schedule: [
      // Similar structure with grade-appropriate subjects
    ]
  },
  jhs1: {
    title: "JHS 1 Timetable",
    schedule: [
      // JHS-specific subjects
    ]
  },
  jhs2: {
    title: "JHS 2 Timetable",
    schedule: [
      // JHS-specific subjects
    ]
  },
  jhs3: {
    title: "JHS 3 Timetable",
    schedule: [
      // JHS-specific subjects
    ]
  },
  shs1: {
    title: "SHS 1 Timetable",
    schedule: [
      // SHS-specific subjects
    ]
  },
  shs2: {
    title: "SHS 2 Timetable",
    schedule: [
      // SHS-specific subjects
    ]
  },
  shs3: {
    title: "SHS 3 Timetable",
    schedule: [
      // SHS-specific subjects
    ]
  },
  ils1: {
    title: "ILS 1 Timetable",
    schedule: [
      // ILS-specific subjects
    ]
  },
  ils2: {
    title: "ILS 2 Timetable",
    schedule: [
      // ILS-specific subjects
    ]
  },
  ils3: {
    title: "ILS 3 Timetable",
    schedule: [
      // ILS-specific subjects
    ]
  },
  olevel1: {
    title: "O Level 1 Timetable",
    schedule: [
      // O Level-specific subjects
    ]
  },
  olevel2: {
    title: "O Level 2 Timetable",
    schedule: [
      // O Level-specific subjects
    ]
  },
  alevel: {
    title: "A Level Timetable",
    schedule: [
      // A Level-specific subjects
    ]
  },

  // Query methods
  getAllTimetables: function() {
    return Object.values(this).filter(item => typeof item === 'object' && item.title);
  },

  getTimetableByGrade: function(grade) {
    const gradeKey = grade.toLowerCase().replace(/\s+/g, '');
    return this[gradeKey] || this.preschool; // Default to preschool if not found
  }
};