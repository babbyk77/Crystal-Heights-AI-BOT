// teachersDisplay.js

class TeachersDisplay {
  constructor() {
    this.db = teachersDatabase;
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
      .teachers-container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.18);
      }

      .teachers-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }

      .teachers-title {
        font-size: 1.8rem;
        color: #ff7b25;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .teachers-controls {
        display: flex;
        gap: 10px;
      }

      .teachers-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        background: rgba(255, 123, 37, 0.2);
        color: white;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .teachers-btn:hover {
        background: rgba(255, 123, 37, 0.4);
      }

      .teachers-btn.active {
        background: #ff7b25;
      }

      .search-container {
        margin-bottom: 20px;
        position: relative;
      }

      .search-input {
        width: 100%;
        padding: 12px 20px;
        padding-right: 50px;
        border: none;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.15);
        color: white;
        font-size: 1rem;
        outline: none;
      }

      .search-icon {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.7);
      }

      .teachers-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .teacher-card {
        background: rgba(26, 26, 46, 0.7);
        border-radius: 12px;
        padding: 20px;
        transition: all 0.3s;
        border-left: 4px solid #ff7b25;
      }

      .teacher-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }

      .teacher-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
      }

      .teacher-avatar {
        font-size: 2.5rem;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 123, 37, 0.2);
      }

      .teacher-name {
        font-size: 1.2rem;
        font-weight: 600;
        margin: 0;
        color: white;
      }

      .teacher-grade {
        font-size: 0.9rem;
        opacity: 0.8;
        margin: 5px 0 0;
      }

      .teacher-details {
        margin-top: 15px;
      }

      .detail-row {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
      }

      .detail-icon {
        margin-right: 10px;
        color: #ff7b25;
        width: 20px;
        text-align: center;
      }

      .detail-label {
        font-weight: 500;
        margin-right: 5px;
        min-width: 70px;
      }

      .detail-value {
        opacity: 0.9;
      }

      .subjects-container {
        margin-top: 15px;
      }

      .subjects-title {
        font-size: 0.9rem;
        margin-bottom: 8px;
        color: #ffd166;
      }

      .subject-tag {
        display: inline-block;
        background: rgba(255, 209, 102, 0.2);
        color: #ffd166;
        padding: 4px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        margin-right: 8px;
        margin-bottom: 8px;
      }

      .teacher-type {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 0.8rem;
        padding: 3px 8px;
        border-radius: 12px;
        background: rgba(239, 71, 111, 0.2);
        color: #ef476f;
      }

      .table-view {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      .table-view th {
        background: rgba(255, 123, 37, 0.3);
        padding: 12px 15px;
        text-align: left;
      }

      .table-view td {
        padding: 12px 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .table-view tr:hover {
        background: rgba(255, 123, 37, 0.1);
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: rgba(255, 255, 255, 0.6);
        grid-column: 1 / -1;
      }

      .empty-icon {
        font-size: 3rem;
        margin-bottom: 15px;
        opacity: 0.5;
      }

      .filter-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }

      .filter-tab {
        padding: 8px 16px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s;
      }

      .filter-tab:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .filter-tab.active {
        background: #ff7b25;
      }

      @media (max-width: 768px) {
        .teachers-grid {
          grid-template-columns: 1fr;
        }
        
        .teacher-header {
          flex-direction: column;
          text-align: center;
        }
        
        .teacher-avatar {
          margin-bottom: 10px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  renderDefaultView() {
    const container = document.createElement('div');
    container.className = 'teachers-container';
    container.innerHTML = `
      <div class="teachers-header">
        <h2 class="teachers-title">
          <i class="fas fa-chalkboard-teacher"></i> CHIS Teaching Staff
        </h2>
        <div class="teachers-controls">
          <button class="teachers-btn active" data-view="grid">
            <i class="fas fa-th-large"></i> Grid
          </button>
          <button class="teachers-btn" data-view="table">
            <i class="fas fa-table"></i> Table
          </button>
        </div>
      </div>

      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search teachers by name, subject or grade...">
        <i class="fas fa-search search-icon"></i>
      </div>

      <div class="filter-tabs">
        <div class="filter-tab active" data-filter="all">All Teachers</div>
        <div class="filter-tab" data-filter="class">Class Teachers</div>
        <div class="filter-tab" data-filter="subject">Subject Teachers</div>
        <div class="filter-tab" data-filter="preschool">Pre-School</div>
        <div class="filter-tab" data-filter="primary">Primary (G1-G6)</div>
        <div class="filter-tab" data-filter="jhs">JHS</div>
        <div class="filter-tab" data-filter="shs">SHS</div>
        <div class="filter-tab" data-filter="advanced">Advanced Levels</div>
      </div>

      <div class="teachers-grid" id="teachersView">
        <!-- Teachers will be rendered here -->
      </div>
    `;

    document.getElementById('chatBody').appendChild(container);
    this.renderTeachers(this.db.getAllTeachers(), 'grid');
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-view]')) {
        const view = e.target.closest('[data-view]').dataset.view;
        document.querySelectorAll('[data-view]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.view === view);
        });
        const currentTeachers = this.getCurrentTeachers();
        this.renderTeachers(currentTeachers, view);
      }

      const searchInput = document.querySelector('.search-input');
  const searchIcon = document.querySelector('.search-icon');
  
  // Handle Enter key in search input
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      this.executeSearch();
    }
  });

  searchIcon.addEventListener('click', () => {
    this.executeSearch();
  });


      if (e.target.closest('[data-filter]')) {
        const filter = e.target.closest('[data-filter]').dataset.filter;
        document.querySelectorAll('[data-filter]').forEach(tab => {
          tab.classList.toggle('active', tab.dataset.filter === filter);
        });
        this.applyFilter(filter);
      }
    });

    document.querySelector('.search-input').addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (query.length > 2) {
        this.renderTeachers(this.db.searchTeachers(query), 
          document.querySelector('[data-view].active').dataset.view);
      } else if (query.length === 0) {
        this.applyFilter(document.querySelector('[data-filter].active').dataset.filter);
      }
    });
  }

  executeSearch() {
  const query = document.querySelector('.search-input').value.trim();
  const activeView = document.querySelector('[data-view].active').dataset.view;
  
  if (query.length > 0) {
    this.renderTeachers(this.db.searchTeachers(query), activeView);
  } else {
    // If search is empty, show all teachers
    this.applyFilter(document.querySelector('[data-filter].active').dataset.filter);
  }
}

  applyFilter(filter) {
    let teachers = [];
    switch(filter) {
      case 'all':
        teachers = this.db.getAllTeachers();
        break;
      case 'class':
        teachers = this.db.getClassTeachers();
        break;
      case 'subject':
        teachers = this.db.getSubjectTeachers();
        break;
      case 'preschool':
        teachers = this.db.getTeachersByGrade('Pre-School');
        break;
      case 'primary':
        teachers = [
          ...this.db.getTeachersByGrade('Grade 1'),
          ...this.db.getTeachersByGrade('Grade 2'),
          ...this.db.getTeachersByGrade('Grade 3'),
          ...this.db.getTeachersByGrade('Grade 4'),
          ...this.db.getTeachersByGrade('Grade 5'),
          ...this.db.getTeachersByGrade('Grade 6')
        ];
        break;
      case 'jhs':
        teachers = [
          ...this.db.getTeachersByGrade('JHS 1'),
          ...this.db.getTeachersByGrade('JHS 2'),
          ...this.db.getTeachersByGrade('JHS 3')
        ];
        break;
      case 'shs':
        teachers = [
          ...this.db.getTeachersByGrade('SHS 1'),
          ...this.db.getTeachersByGrade('SHS 2'),
          ...this.db.getTeachersByGrade('SHS 3')
        ];
        break;
      case 'advanced':
        teachers = [
          ...this.db.getTeachersByGrade('O Level'),
          ...this.db.getTeachersByGrade('A Level'),
          ...this.db.getTeachersByGrade('ILS')
        ];
        break;
    }
    
    const view = document.querySelector('[data-view].active').dataset.view;
    this.renderTeachers(teachers, view);
  }

  getCurrentTeachers() {
    const filter = document.querySelector('[data-filter].active').dataset.filter;
    const query = document.querySelector('.search-input').value.trim();
    
    if (query.length > 2) {
      return this.db.searchTeachers(query);
    }
    
    return this.applyFilter(filter);
  }

  renderTeachers(teachers, viewType) {
    const container = document.getElementById('teachersView');
    container.innerHTML = '';

    if (teachers.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-user-slash"></i>
          </div>
          <h3>No Teachers Found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      `;
      return;
    }

    if (viewType === 'grid') {
      teachers.forEach(teacher => {
        const card = document.createElement('div');
        card.className = 'teacher-card';
        card.innerHTML = this.getTeacherCardHTML(teacher);
        container.appendChild(card);
      });
    } else {
      const table = document.createElement('table');
      table.className = 'table-view';
      table.innerHTML = `
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Grade/Class</th>
            <th>Subjects</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          ${teachers.map(teacher => this.getTeacherRowHTML(teacher)).join('')}
        </tbody>
      `;
      container.appendChild(table);
    }
  }

  getTeacherCardHTML(teacher) {
    return `
      <div class="teacher-type">${teacher.type === 'class' ? 'Class Teacher' : 'Subject Teacher'}</div>
      <div class="teacher-header">
        <div class="teacher-avatar">${teacher.avatar || '👨🏾‍🏫'}</div>
        <div>
          <h3 class="teacher-name">${teacher.name}</h3>
          ${teacher.grade ? `<p class="teacher-grade">${teacher.grade}</p>` : ''}
        </div>
      </div>
      <div class="teacher-details">
        ${teacher.phone ? `
        <div class="detail-row">
          <span class="detail-icon"><i class="fas fa-phone"></i></span>
          <span class="detail-value">${teacher.phone}</span>
        </div>` : ''}
        
        ${teacher.email ? `
        <div class="detail-row">
          <span class="detail-icon"><i class="fas fa-envelope"></i></span>
          <span class="detail-value">${teacher.email}</span>
        </div>` : ''}
        
        ${teacher.subjects && teacher.subjects.length ? `
        <div class="subjects-container">
          <p class="subjects-title">Subjects:</p>
          ${teacher.subjects.map(subj => `<span class="subject-tag">${subj}</span>`).join('')}
        </div>` : ''}
      </div>
    `;
  }

  getTeacherRowHTML(teacher) {
    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2rem;">${teacher.avatar || '👨🏾‍🏫'}</span>
            ${teacher.name}
          </div>
        </td>
        <td>${teacher.grade || '-'}</td>
        <td>${teacher.subjects ? teacher.subjects.join(', ') : '-'}</td>
        <td>
          ${teacher.phone ? `<div><i class="fas fa-phone"></i> ${teacher.phone}</div>` : ''}
          ${teacher.email ? `<div><i class="fas fa-envelope"></i> ${teacher.email}</div>` : ''}
        </td>
      </tr>
    `;
  }
}

// Initialize when added to chatty.html
function initializeTeachersDisplay() {
  new TeachersDisplay();
}
