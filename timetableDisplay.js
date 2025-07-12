// timetableDisplay.js

class TimetableDisplay {
  constructor() {
    this.db = timetableDatabase;
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
      .timetable-container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.18);
      }

      .timetable-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }

      .timetable-title {
        font-size: 1.8rem;
        color: #ff7b25;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .grade-selector {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
        margin-bottom: 20px;
      }

      .grade-tab {
        padding: 8px 12px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        cursor: pointer;
        font-size: 0.9rem;
        text-align: center;
        transition: all 0.3s;
      }

      .grade-tab:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .grade-tab.active {
        background: #ff7b25;
      }

      .timetable-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      .timetable-table th {
        background: rgba(255, 123, 37, 0.3);
        padding: 12px 15px;
        text-align: left;
      }

      .timetable-table td {
        padding: 12px 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .timetable-table tr:hover {
        background: rgba(255, 123, 37, 0.1);
      }

      .time-column {
        width: 20%;
        font-weight: 500;
      }

      .activity-column {
        width: 80%;
      }

      @media (max-width: 768px) {
        .grade-selector {
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        }
        
        .timetable-table {
          display: block;
          overflow-x: auto;
        }
        
        .time-column {
          width: 30%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  renderDefaultView() {
    const container = document.createElement('div');
    container.className = 'timetable-container';
    container.innerHTML = `
      <div class="timetable-header">
        <h2 class="timetable-title">
          <i class="fas fa-clock"></i> CHIS Timetable
        </h2>
      </div>

      <div class="grade-selector">
        <div class="grade-tab active" data-grade="preschool">Pre-School</div>
        <div class="grade-tab" data-grade="grade1">Grade 1</div>
        <div class="grade-tab" data-grade="grade2">Grade 2</div>
        <div class="grade-tab" data-grade="grade3">Grade 3</div>
        <div class="grade-tab" data-grade="grade4">Grade 4</div>
        <div class="grade-tab" data-grade="grade5">Grade 5</div>
        <div class="grade-tab" data-grade="grade6">Grade 6</div>
        <div class="grade-tab" data-grade="jhs1">JHS 1</div>
        <div class="grade-tab" data-grade="jhs2">JHS 2</div>
        <div class="grade-tab" data-grade="jhs3">JHS 3</div>
        <div class="grade-tab" data-grade="shs1">SHS 1</div>
        <div class="grade-tab" data-grade="shs2">SHS 2</div>
        <div class="grade-tab" data-grade="shs3">SHS 3</div>
        <div class="grade-tab" data-grade="ils1">ILS 1</div>
        <div class="grade-tab" data-grade="ils2">ILS 2</div>
        <div class="grade-tab" data-grade="ils3">ILS 3</div>
        <div class="grade-tab" data-grade="olevel1">O Level 1</div>
        <div class="grade-tab" data-grade="olevel2">O Level 2</div>
        <div class="grade-tab" data-grade="alevel">A Level</div>
      </div>

      <div id="timetableView">
        ${this.renderTimetable(this.db.preschool)}
      </div>
    `;

    document.getElementById('chatBody').appendChild(container);
  }

  renderTimetable(timetable) {
    return `
      <h3 style="margin-bottom: 15px; color: #ffd166;">${timetable.title}</h3>
      <table class="timetable-table">
        <thead>
          <tr>
            <th class="time-column">Time</th>
            <th class="activity-column">Activity/Subject</th>
          </tr>
        </thead>
        <tbody>
          ${timetable.schedule.map(item => `
            <tr>
              <td>${item.time}</td>
              <td>${item.activity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-grade]')) {
        const grade = e.target.closest('[data-grade]').dataset.grade;
        document.querySelectorAll('[data-grade]').forEach(tab => {
          tab.classList.toggle('active', tab.dataset.grade === grade);
        });
        
        const timetableView = document.getElementById('timetableView');
        timetableView.innerHTML = this.renderTimetable(this.db.getTimetableByGrade(grade));
      }
    });
  }
}

// Initialize when added to chatty.html
function initializeTimetableDisplay() {
  new TimetableDisplay();
}