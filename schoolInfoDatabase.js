// schoolInfoDatabase.js

const schoolInfoDatabase = {
  // School Anthem
  anthem: {
    audio: "school anthem.mp3", //C:\Users\cindi\Documents\school anthem.mp3
    lyrics: `First Verse 
Preparation ves les success
Crystal Heights International School 
Come all ye who seek success 
Crystal Heights International School 

Let us rise to the clarion call
And uphold the vision of the founding father
Preparation ves les success
Crystal Heights International School 

 Second Verse 

For the first, with the best we shall strive
Sons and daughters of great Crystal Heights 
With God on our side, we shall thrive
Raising minds that will lead and succeed 

Let us rise to the clarion call
And uphold the vision of the founding father
Preparation ves les success
Crystal Heights International School.`
  },

  // School History and Founders
  history: {
    founder: "Dr. Kwame Mensah",
    establishmentYear: 2014,
    vision: "To be a leading international school that nurtures holistic development and academic excellence",
    mission: "To provide quality education that empowers students to become innovative leaders and responsible global citizens",
    milestones: [
      "1995: School founded with 50 students",
      "2002: First international accreditation received",
      "2010: Expanded to include Advanced Levels",
      "2018: Robotics program introduced",
      "2022: Ranked top international school in Ghana"
    ]
  },

  // School Leadership
  leadership: [
    {
      id: 1,
      name: "Dr. Kwame Mensah",
      position: "School Chairman",
      bio: "Founder and visionary leader with 30+ years in education",
      email: "chairman@chis.edu.gh",
      phone: "+233244123456",
      avatar: "👨🏾‍💼",
      division: "Administration"
    },
    {
      id: 2,
      name: "Mrs. Ama Serwaa",
      position: "School Principal",
      bio: "Education specialist with expertise in curriculum development",
      email: "principal@chis.edu.gh",
      phone: "+233244123457",
      avatar: "👩🏾‍🏫",
      division: "Administration"
    },
    {
      id: 3,
      name: "Mr. Yaw Boateng",
      position: "Headmaster - Pre-School",
      bio: "Early childhood education expert with 15 years experience",
      email: "preschool@chis.edu.gh",
      phone: "+233244123458",
      avatar: "👨🏾‍🏫",
      division: "Pre-School"
    },
    {
      id: 4,
      name: "Mrs. Efua Johnson",
      position: "Headmaster - GES Division",
      bio: "Specialist in Ghana Education Service curriculum",
      email: "ges@chis.edu.gh",
      phone: "+233244123459",
      avatar: "👩🏾‍🏫",
      division: "GES"
    },
    {
      id: 5,
      name: "Mr. David Ofori",
      position: "Headmaster - Pearson Division",
      bio: "International curriculum coordinator",
      email: "pearson@chis.edu.gh",
      phone: "+233244123460",
      avatar: "👨🏾‍🏫",
      division: "Pearson"
    }
  ],

  // Support Staff
  supportStaff: [
    {
      id: 6,
      name: "Ms. Akosua Adjei",
      position: "School Secretary",
      email: "secretary@chis.edu.gh",
      phone: "+233244123461",
      avatar: "👩🏾‍💼"
    },
    {
      id: 7,
      name: "Mr. Kofi Asare",
      position: "Head of Security",
      email: "security@chis.edu.gh",
      phone: "+233244123462",
      avatar: "👨🏾✈️"
    },
    {
      id: 8,
      name: "Mrs. Grace Mensah",
      position: "Librarian",
      email: "library@chis.edu.gh",
      phone: "+233244123463",
      avatar: "👩🏾‍💻"
    },
    {
      id: 9,
      name: "Mr. Samuel Owusu",
      position: "IT Support",
      email: "it@chis.edu.gh",
      phone: "+233244123464",
      avatar: "👨🏾‍💻"
    }
  ],

  // Success Stories
  successStories: [
    {
      id: 1,
      title: "International Robotics Champions",
      year: 2021,
      description: "Our robotics team won first place in the Pan-African Robotics Competition",
      students: ["Kwame Appiah", "Ama Serwaa", "Yaw Boateng"]
    },
    {
      id: 2,
      title: "Perfect SAT Scores",
      year: 2020,
      description: "Three students achieved perfect scores in SAT examinations",
      students: ["Esi Mensah", "Kofi Asante", "Adwoa Smart"]
    },
    {
      id: 3,
      title: "University Scholarships",
      year: 2022,
      description: "15 students received full scholarships to Ivy League universities",
      students: ["Nana Yaa", "Kwabena Osei", "Akua Nyamekye"]
    }
  ],

  // Special Needs Program
  specialNeeds: {
    description: "Our inclusive education program provides specialized support for students with diverse learning needs",
    services: [
      "Individualized Education Plans (IEPs)",
      "Speech and language therapy",
      "Occupational therapy",
      "Sensory integration rooms",
      "Trained special education teachers"
    ],
    contact: {
      email: "specialneeds@chis.edu.gh",
      phone: "+233244123465"
    }
  },

  // Useful Links
  links: [
    {
      title: "School Website",
      url: "https://www.crystalheights.edu.gh",
      description: "Official school website"
    },
    {
      title: "Parent Portal",
      url: "https://portal.crystalheights.edu.gh",
      description: "Access grades and school communications"
    },
    {
      title: "E-Learning Platform",
      url: "https://elearn.crystalheights.edu.gh",
      description: "Online learning resources"
    }
  ],

  // Query methods
  getAllInfo: function() {
    return {
      anthem: this.anthem,
      history: this.history,
      leadership: this.leadership,
      supportStaff: this.supportStaff,
      successStories: this.successStories,
      specialNeeds: this.specialNeeds,
      links: this.links
    };
  },

  getLeadershipByDivision: function(division) {
    return this.leadership.filter(leader => 
      leader.division.toLowerCase().includes(division.toLowerCase())
    );
  },

  getSupportStaff: function() {
    return this.supportStaff;
  },

  searchInfo: function(query) {
    const lowerQuery = query.toLowerCase();
    const results = [];
    
    // Search leadership
    this.leadership.forEach(person => {
      if (person.name.toLowerCase().includes(lowerQuery)) {
        results.push({...person, type: 'leader'});
      }
    });
    
    // Search support staff
    this.supportStaff.forEach(person => {
      if (person.name.toLowerCase().includes(lowerQuery)) {
        results.push({...person, type: 'staff'});
      }
    });
    
    // Search success stories
    this.successStories.forEach(story => {
      if (story.title.toLowerCase().includes(lowerQuery) || 
         story.description.toLowerCase().includes(lowerQuery)) {
        results.push({...story, type: 'story'});
      }
    });
    
    return results;
  }
};