// schoolInfoQuery.js

class SchoolInfoQuery {
  constructor() {
    this.db = schoolInfoDatabase;
  }

  handleQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    // Check for specific patterns
    if (lowerQuery.includes('school anthem')) {
      return this.getAnthemResponse();
    }
    
    if (lowerQuery.includes('school history') || lowerQuery.includes('founder')) {
      return this.getHistoryResponse();
    }
    
    if (lowerQuery.includes('school leadership') || lowerQuery.includes('headmaster') || lowerQuery.includes('principal')) {
      return this.getLeadershipResponse();
    }
    
    if (lowerQuery.includes('support staff') || lowerQuery.includes('secretary') || lowerQuery.includes('security')) {
      return this.getSupportStaffResponse();
    }
    
    if (lowerQuery.includes('success stories') || lowerQuery.includes('achievements')) {
      return this.getSuccessStoriesResponse();
    }
    
    if (lowerQuery.includes('special needs') || lowerQuery.includes('inclusive education')) {
      return this.getSpecialNeedsResponse();
    }
    
    if (lowerQuery.includes('school links') || lowerQuery.includes('useful links')) {
      return this.getLinksResponse();
    }
    
    // Default search
    return this.searchInfoResponse(query);
  }

  getAnthemResponse() {
    const anthem = this.db.anthem;
    return {
      text: `Here's information about the CHIS school anthem:`,
      html: `
        <div style="margin-top: 15px;">
          <h3>CHIS School Anthem</h3>
          <p>You can listen to the anthem or view the lyrics in the full school information section.</p>
          <button onclick="initializeSchoolInfoDisplay()" style="margin-top: 10px; padding: 8px 15px; background: #ff7b25; color: white; border: none; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-school"></i> View School Information
          </button>
        </div>
      `,
      action: 'initializeSchoolInfoDisplay'
    };
  }

  getHistoryResponse() {
    const history = this.db.history;
    return {
      text: `Here's information about CHIS history and founder:`,
      html: `
        <div style="margin-top: 15px;">
          <h3>CHIS History</h3>
          <p><strong>Founded:</strong> ${history.establishmentYear} by ${history.founder}</p>
          <p><strong>Vision:</strong> ${history.vision}</p>
          <p><strong>Mission:</strong> ${history.mission}</p>
          <button onclick="initializeSchoolInfoDisplay()" style="margin-top: 10px; padding: 8px 15px; background: #ff7b25; color: white; border: none; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-school"></i> View Full History
          </button>
        </div>
      `,
      action: 'initializeSchoolInfoDisplay'
    };
  }

  getLeadershipResponse() {
    const leaders = this.db.leadership;
    return {
      text: `There are ${leaders.length} leaders at CHIS. Here are some of them:`,
      html: `
        <div style="margin-top: 15px;">
          <h3>School Leadership</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; margin-top: 15px;">
            ${leaders.slice(0, 3).map(leader => `
              <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #ff7b25;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.5rem;">${leader.avatar}</span>
                  <div>
                    <strong>${leader.name}</strong>
                    <div style="font-size: 0.9em; opacity: 0.8;">${leader.position}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <button onclick="initializeSchoolInfoDisplay()" style="margin-top: 10px; padding: 8px 15px; background: #ff7b25; color: white; border: none; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-users-cog"></i> View All Leaders
          </button>
        </div>
      `,
      action: 'initializeSchoolInfoDisplay'
    };
  }

  getSupportStaffResponse() {
    const staff = this.db.supportStaff;
    return {
      text: `There are ${staff.length} support staff members at CHIS. Here are some of them:`,
      html: `
        <div style="margin-top: 15px;">
          <h3>Support Staff</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; margin-top: 15px;">
            ${staff.slice(0, 3).map(person => `
              <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #ff7b25;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.5rem;">${person.avatar}</span>
                  <div>
                    <strong>${person.name}</strong>
                    <div style="font-size: 0.9em; opacity: 0.8;">${person.position}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <button onclick="initializeSchoolInfoDisplay()" style="margin-top: 10px; padding: 8px 15px; background: #ff7b25; color: white; border: none; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-user-tie"></i> View All Staff
          </button>
        </div>
      `,
      action: 'initializeSchoolInfoDisplay'
    };
  }

  getSuccessStoriesResponse() {
    const stories = this.db.successStories;
    return {
      text: `Here are some of CHIS's success stories:`,
      html: `
        <div style="margin-top: 15px;">
          <h3>Success Stories</h3>
          <ul style="margin-top: 10px;">
            ${stories.slice(0, 3).map(story => `
              <li>
                <strong>${story.title} (${story.year})</strong>: ${story.description}
              </li>
            `).join('')}
          </ul>
          <button onclick="initializeSchoolInfoDisplay()" style="margin-top: 10px; padding: 8px 15px; background: #ff7b25; color: white; border: none; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-trophy"></i> View All Stories
          </button>
        </div>
      `,
      action: 'initializeSchoolInfoDisplay'
    };
  }

  getSpecialNeedsResponse() {
    const specialNeeds = this.db.specialNeeds;
    return {
      text: `Here's information about CHIS's special needs program:`,
      html: `
        <div style="margin-top: 15px;">
          <h3>Special Needs Program</h3>
          <p>${specialNeeds.description}</p>
          <button onclick="initializeSchoolInfoDisplay()" style="margin-top: 10px; padding: 8px 15px; background: #ff7b25; color: white; border: none; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-heart"></i> View Program Details
          </button>
        </div>
      `,
      action: 'initializeSchoolInfoDisplay'
    };
  }

  getLinksResponse() {
    const links = this.db.links;
    return {
      text: `Here are some useful CHIS links:`,
      html: `
        <div style="margin-top: 15px;">
          <h3>Useful Links</h3>
          <ul style="margin-top: 10px;">
            ${links.slice(0, 3).map(link => `
              <li>
                <strong>${link.title}</strong>: <a href="${link.url}" target="_blank" style="color: #ff7b25;">${link.url}</a>
              </li>
            `).join('')}
          </ul>
          <button onclick="initializeSchoolInfoDisplay()" style="margin-top: 10px; padding: 8px 15px; background: #ff7b25; color: white; border: none; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-link"></i> View All Links
          </button>
        </div>
      `,
      action: 'initializeSchoolInfoDisplay'
    };
  }

  searchInfoResponse(query) {
    const results = this.db.searchInfo(query);
    if (results.length === 0) {
      return {
        text: `I couldn't find any information matching "${query}". Try asking about school history, leadership, or other school information.`,
        html: `<p>I couldn't find any information matching "${query}". Try asking about school history, leadership, or other school information.</p>`
      };
    }
    
    return {
      text: `I found ${results.length} items matching "${query}":`,
      html: `
        <div style="margin-top: 15px;">
          <h3>Search Results</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; margin-top: 15px;">
            ${results.slice(0, 3).map(item => {
              if (item.type === 'leader' || item.type === 'staff') {
                return `
                  <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #ff7b25;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                      <span style="font-size: 1.5rem;">${item.avatar}</span>
                      <div>
                        <strong>${item.name}</strong>
                        <div style="font-size: 0.9em; opacity: 0.8;">${item.position}</div>
                      </div>
                    </div>
                  </div>
                `;
              } else if (item.type === 'story') {
                return `
                  <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #ffd166;">
                    <div style="font-weight: 600; color: #ffd166; margin-bottom: 8px;">${item.title} (${item.year})</div>
                    <p>${item.description}</p>
                  </div>
                `;
              }
            }).join('')}
          </div>
          ${results.length > 3 ? `<p>...and ${results.length - 3} more</p>` : ''}
          <button onclick="initializeSchoolInfoDisplay()" style="margin-top: 10px; padding: 8px 15px; background: #ff7b25; color: white; border: none; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-school"></i> View Full School Information
          </button>
        </div>
      `,
      action: 'initializeSchoolInfoDisplay'
    };
  }
}

const schoolInfoQuery = new SchoolInfoQuery();