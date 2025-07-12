// schoolInfoDisplay.js

class SchoolInfoDisplay {
  constructor() {
    this.db = schoolInfoDatabase;
    this.init();
  }

  init() {
    this.createStyles();
    this.renderDefaultView();
    this.setupEventListeners();
  }

  createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .school-info-container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.18);
      }

      .school-info-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }

      .school-info-title {
        font-size: 1.8rem;
        color: #ff7b25;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .school-info-tabs {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }

      .school-info-tab {
        padding: 10px 20px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.9rem;
      }

      .school-info-tab:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .school-info-tab.active {
        background: #ff7b25;
      }

      .info-section {
        margin-bottom: 30px;
        animation: fadeIn 0.5s ease-out;
      }

      .info-section-title {
        font-size: 1.4rem;
        color: #ffd166;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }

      .info-card {
        background: rgba(26, 26, 46, 0.7);
        border-radius: 12px;
        padding: 20px;
        transition: all 0.3s;
        border-left: 4px solid #ff7b25;
      }

      .info-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }

      .person-card {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .person-avatar {
        font-size: 2rem;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 123, 37, 0.2);
      }

      .person-details {
        flex: 1;
      }

      .person-name {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
        color: white;
      }

      .person-position {
        font-size: 0.9rem;
        opacity: 0.8;
        margin: 5px 0 0;
      }

      .anthem-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .anthem-audio {
        width: 100%;
        max-width: 400px;
      }

      .anthem-lyrics {
        background: rgba(0, 0, 0, 0.2);
        padding: 15px;
        border-radius: 8px;
        white-space: pre-line;
        line-height: 1.6;
      }

      .history-item {
        margin-bottom: 15px;
        padding-left: 15px;
        border-left: 3px solid #ff7b25;
      }

      .history-year {
        font-weight: 600;
        color: #ffd166;
      }

      .story-card {
        padding: 15px;
        background: rgba(255, 209, 102, 0.1);
        border-radius: 8px;
      }

      .story-title {
        font-weight: 600;
        color: #ffd166;
        margin-bottom: 8px;
      }

      .story-students {
        font-size: 0.9rem;
        opacity: 0.8;
        margin-top: 10px;
      }

      .link-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 8px;
        transition: all 0.3s;
      }

      .link-item:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .link-icon {
        font-size: 1.2rem;
        color: #ff7b25;
      }

      .link-details {
        flex: 1;
      }

      .link-title {
        font-weight: 500;
      }

      .link-url {
        font-size: 0.8rem;
        opacity: 0.7;
        word-break: break-all;
      }

      .special-needs-services {
        margin-top: 15px;
        padding-left: 20px;
      }

      .special-needs-service {
        margin-bottom: 8px;
        position: relative;
        padding-left: 20px;
      }

      .special-needs-service::before {
        content: "•";
        position: absolute;
        left: 0;
        color: #ff7b25;
        font-size: 1.2rem;
      }

      @media (max-width: 768px) {
        .info-grid {
          grid-template-columns: 1fr;
        }
        
        .person-card {
          flex-direction: column;
          text-align: center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  renderDefaultView() {
    const container = document.createElement('div');
    container.className = 'school-info-container';
    container.innerHTML = `
      <div class="school-info-header">
        <h2 class="school-info-title">
          <i class="fas fa-school"></i> CHIS School Information
        </h2>
      </div>

      <div class="school-info-tabs">
        <div class="school-info-tab active" data-tab="about">About CHIS</div>
        <div class="school-info-tab" data-tab="leadership">Leadership</div>
        <div class="school-info-tab" data-tab="staff">Support Staff</div>
        <div class="school-info-tab" data-tab="success">Success Stories</div>
        <div class="school-info-tab" data-tab="special">Special Needs</div>
        <div class="school-info-tab" data-tab="links">Useful Links</div>
      </div>

      <div id="schoolInfoContent">
        <!-- Content will be rendered here -->
      </div>
    `;

    document.getElementById('chatBody').appendChild(container);
    this.renderAboutSection();
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-tab]')) {
        const tab = e.target.closest('[data-tab]').dataset.tab;
        document.querySelectorAll('[data-tab]').forEach(t => {
          t.classList.toggle('active', t.dataset.tab === tab);
        });
        
        switch(tab) {
          case 'about':
            this.renderAboutSection();
            break;
          case 'leadership':
            this.renderLeadershipSection();
            break;
          case 'staff':
            this.renderStaffSection();
            break;
          case 'success':
            this.renderSuccessStoriesSection();
            break;
          case 'special':
            this.renderSpecialNeedsSection();
            break;
          case 'links':
            this.renderLinksSection();
            break;
        }
      }
    });
  }

  renderAboutSection() {
    const content = document.getElementById('schoolInfoContent');
    const info = this.db.getAllInfo();
    
    content.innerHTML = `
      <div class="info-section">
        <h3 class="info-section-title"><i class="fas fa-history"></i> School History</h3>
        <div class="history-item">
          <div class="history-year">Founded: ${info.history.establishmentYear}</div>
          <p>Founder: ${info.history.founder}</p>
        </div>
        
        <div class="history-item">
          <div class="history-year">Vision</div>
          <p>${info.history.vision}</p>
        </div>
        
        <div class="history-item">
          <div class="history-year">Mission</div>
          <p>${info.history.mission}</p>
        </div>
        
        <h4 style="margin-top: 20px;">Key Milestones:</h4>
        ${info.history.milestones.map(milestone => `
          <div class="history-item">
            <p>${milestone}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="info-section">
        <h3 class="info-section-title"><i class="fas fa-music"></i> School Anthem</h3>
        <div class="anthem-container">
          <audio controls class="anthem-audio">
            <source src="${info.anthem.audio}" type="audio/mp3">
            <p> Your browser does not support this audio file formatt</p>
          </audio>
          <div class="anthem-lyrics">${info.anthem.lyrics}</div>
        </div>
      </div>
    `;
  }

  renderLeadershipSection() {
    const content = document.getElementById('schoolInfoContent');
    const leaders = this.db.leadership;
    
    content.innerHTML = `
      <div class="info-section">
        <h3 class="info-section-title"><i class="fas fa-users-cog"></i> School Leadership</h3>
        <div class="info-grid">
          ${leaders.map(leader => `
            <div class="info-card">
              <div class="person-card">
                <div class="person-avatar">${leader.avatar}</div>
                <div class="person-details">
                  <h4 class="person-name">${leader.name}</h4>
                  <p class="person-position">${leader.position}</p>
                  <p>${leader.division}</p>
                  ${leader.phone ? `<p><i class="fas fa-phone"></i> ${leader.phone}</p>` : ''}
                  ${leader.email ? `<p><i class="fas fa-envelope"></i> ${leader.email}</p>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderStaffSection() {
    const content = document.getElementById('schoolInfoContent');
    const staff = this.db.supportStaff;
    
    content.innerHTML = `
      <div class="info-section">
        <h3 class="info-section-title"><i class="fas fa-user-tie"></i> Support Staff</h3>
        <div class="info-grid">
          ${staff.map(person => `
            <div class="info-card">
              <div class="person-card">
                <div class="person-avatar">${person.avatar}</div>
                <div class="person-details">
                  <h4 class="person-name">${person.name}</h4>
                  <p class="person-position">${person.position}</p>
                  ${person.phone ? `<p><i class="fas fa-phone"></i> ${person.phone}</p>` : ''}
                  ${person.email ? `<p><i class="fas fa-envelope"></i> ${person.email}</p>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderSuccessStoriesSection() {
    const content = document.getElementById('schoolInfoContent');
    const stories = this.db.successStories;
    
    content.innerHTML = `
      <div class="info-section">
        <h3 class="info-section-title"><i class="fas fa-trophy"></i> Success Stories</h3>
        <div class="info-grid">
          ${stories.map(story => `
            <div class="info-card story-card">
              <div class="story-title">${story.title} (${story.year})</div>
              <p>${story.description}</p>
              ${story.students ? `
                <div class="story-students">
                  <strong>Students:</strong> ${story.students.join(', ')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderSpecialNeedsSection() {
    const content = document.getElementById('schoolInfoContent');
    const specialNeeds = this.db.specialNeeds;
    
    content.innerHTML = `
      <div class="info-section">
        <h3 class="info-section-title"><i class="fas fa-heart"></i> Special Needs Program</h3>
        <p>${specialNeeds.description}</p>
        
        <h4 style="margin-top: 20px;">Services Offered:</h4>
        <div class="special-needs-services">
          ${specialNeeds.services.map(service => `
            <div class="special-needs-service">${service}</div>
          `).join('')}
        </div>
        
        <div style="margin-top: 20px;">
          <h4>Contact:</h4>
          <p><i class="fas fa-envelope"></i> ${specialNeeds.contact.email}</p>
          <p><i class="fas fa-phone"></i> ${specialNeeds.contact.phone}</p>
        </div>
      </div>
    `;
  }

  renderLinksSection() {
    const content = document.getElementById('schoolInfoContent');
    const links = this.db.links;
    
    content.innerHTML = `
      <div class="info-section">
        <h3 class="info-section-title"><i class="fas fa-link"></i> Useful Links</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${links.map(link => `
            <div class="link-item">
              <div class="link-icon"><i class="fas fa-external-link-alt"></i></div>
              <div class="link-details">
                <div class="link-title">${link.title}</div>
                <div class="link-url">${link.url}</div>
                ${link.description ? `<div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">${link.description}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Initialize when added to chatty.html
function initializeSchoolInfoDisplay() {
  new SchoolInfoDisplay();
}