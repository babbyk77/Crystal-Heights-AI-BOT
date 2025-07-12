// teachersQuery.js

class TeachersQuery {
  constructor() {
    this.db = teachersDatabase;
  }

  handleQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    // Check for specific patterns
    if (lowerQuery.includes('list all teachers')) {
      return this.getAllTeachersResponse();
    }
    
    if (lowerQuery.includes('class teachers')) {
      return this.getClassTeachersResponse();
    }
    
    if (lowerQuery.includes('subject teachers')) {
      return this.getSubjectTeachersResponse();
    }
    
    if (lowerQuery.match(/teachers in (grade|class|jhs|shs|o level|a level|ils)/)) {
      const gradeMatch = query.match(/in (grade \w|jhs \w|shs \w|o level \w|a level \w|ils \w)/i);
      if (gradeMatch) {
        return this.getTeachersByGradeResponse(gradeMatch[1]);
      }
      
      const levelMatch = query.match(/in (primary|jhs|shs|advanced)/i);
      if (levelMatch) {
        return this.getTeachersByLevelResponse(levelMatch[1]);
      }
    }
    
    if (lowerQuery.includes('teacher named') || lowerQuery.includes('teacher called')) {
      const nameMatch = query.match(/(named|called) (.+)/i);
      if (nameMatch) {
        return this.getTeacherByNameResponse(nameMatch[2]);
      }
    }
    
    if (lowerQuery.includes('who teaches')) {
      const subjectMatch = query.match(/teaches (.+)/i);
      if (subjectMatch) {
        return this.getTeachersBySubjectResponse(subjectMatch[1]);
      }
    }
    
    // Default search
    return this.searchTeachersResponse(query);
  }

  getAllTeachersResponse() {
    const teachers = this.db.getAllTeachers();
    return {
      text: `There are ${teachers.length} teachers at CHIS. Here's the complete list:`,
      html: this.formatTeachersList(teachers),
      action: 'initializeTeachersDisplay'
    };
  }

  getClassTeachersResponse() {
    const teachers = this.db.getClassTeachers();
    return {
      text: `There are ${teachers.length} class teachers at CHIS. They are responsible for specific grades:`,
      html: this.formatTeachersList(teachers),
      action: 'initializeTeachersDisplay'
    };
  }

  getSubjectTeachersResponse() {
    const teachers = this.db.getSubjectTeachers();
    return {
      text: `There are ${teachers.length} subject teachers at CHIS. They specialize in specific subjects:`,
      html: this.formatTeachersList(teachers),
      action: 'initializeTeachersDisplay'
    };
  }

  getTeachersByGradeResponse(grade) {
    const teachers = this.db.getTeachersByGrade(grade);
    return {
      text: `There are ${teachers.length} teachers for ${grade}:`,
      html: this.formatTeachersList(teachers),
      action: 'initializeTeachersDisplay'
    };
  }

  getTeachersByLevelResponse(level) {
    let teachers = [];
    let levelName = '';
    
    switch(level.toLowerCase()) {
      case 'primary':
        teachers = [
          ...this.db.getTeachersByGrade('Grade 1'),
          ...this.db.getTeachersByGrade('Grade 2'),
          ...this.db.getTeachersByGrade('Grade 3'),
          ...this.db.getTeachersByGrade('Grade 4'),
          ...this.db.getTeachersByGrade('Grade 5'),
          ...this.db.getTeachersByGrade('Grade 6')
        ];
        levelName = 'Primary School (Grades 1-6)';
        break;
      case 'jhs':
        teachers = [
          ...this.db.getTeachersByGrade('JHS 1'),
          ...this.db.getTeachersByGrade('JHS 2'),
          ...this.db.getTeachersByGrade('JHS 3')
        ];
        levelName = 'Junior High School';
        break;
      case 'shs':
        teachers = [
          ...this.db.getTeachersByGrade('SHS 1'),
          ...this.db.getTeachersByGrade('SHS 2'),
          ...this.db.getTeachersByGrade('SHS 3')
        ];
        levelName = 'Senior High School';
        break;
      case 'advanced':
        teachers = [
          ...this.db.getTeachersByGrade('O Level'),
          ...this.db.getTeachersByGrade('A Level'),
          ...this.db.getTeachersByGrade('ILS')
        ];
        levelName = 'Advanced Levels (O Level, A Level, ILS)';
        break;
    }
    
    return {
      text: `There are ${teachers.length} teachers in ${levelName}:`,
      html: this.formatTeachersList(teachers),
      action: 'initializeTeachersDisplay'
    };
  }

  getTeacherByNameResponse(name) {
    const teachers = this.db.searchTeachers(name);
    if (teachers.length === 0) {
      return {
        text: `I couldn't find a teacher named "${name}". Please try a different name.`,
        html: `<p>I couldn't find a teacher named "${name}". Please try a different name.</p>`
      };
    }
    
    return {
      text: `I found ${teachers.length} teacher(s) matching "${name}":`,
      html: this.formatTeachersList(teachers),
      action: 'initializeTeachersDisplay'
    };
  }

  getTeachersBySubjectResponse(subject) {
    const teachers = this.db.getTeachersBySubject(subject);
    if (teachers.length === 0) {
      return {
        text: `I couldn't find any teachers for "${subject}". Please try a different subject.`,
        html: `<p>I couldn't find any teachers for "${subject}". Please try a different subject.</p>`
      };
    }
    
    return {
      text: `There are ${teachers.length} teachers who teach ${subject}:`,
      html: this.formatTeachersList(teachers),
      action: 'initializeTeachersDisplay'
    };
  }

  searchTeachersResponse(query) {
    const teachers = this.db.searchTeachers(query);
    if (teachers.length === 0) {
      return {
        text: `I couldn't find any teachers matching "${query}". Please try a different search.`,
        html: `<p>I couldn't find any teachers matching "${query}". Please try a different search.</p>`
      };
    }
    
    return {
      text: `I found ${teachers.length} teacher(s) matching "${query}":`,
      html: this.formatTeachersList(teachers),
      action: 'initializeTeachersDisplay'
    };
  }

  formatTeachersList(teachers) {
    if (teachers.length === 0) return '<p>No teachers found.</p>';
    
    if (teachers.length <= 3) {
      return `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; margin-top: 15px;">
          ${teachers.map(teacher => `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #ff7b25;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <span style="font-size: 1.5rem;">${teacher.avatar || '👨🏾‍🏫'}</span>
                <div>
                  <strong>${teacher.name}</strong>
                  ${teacher.grade ? `<div style="font-size: 0.9em; opacity: 0.8;">${teacher.grade}</div>` : ''}
                </div>
              </div>
              ${teacher.subjects ? `
              <div style="margin-top: 10px;">
                <div style="font-size: 0.9em; margin-bottom: 5px; color: #ffd166;">Subjects:</div>
                ${teacher.subjects.map(subj => `<span style="display: inline-block; background: rgba(255,209,102,0.2); color: #ffd166; padding: 2px 8px; border-radius: 10px; font-size: 0.8em; margin-right: 5px; margin-bottom: 5px;">${subj}</span>`).join('')}
              </div>` : ''}
              ${teacher.phone || teacher.email ? `
              <div style="margin-top: 10px; font-size: 0.9em;">
                ${teacher.phone ? `<div><i class="fas fa-phone" style="margin-right: 5px;"></i> ${teacher.phone}</div>` : ''}
                ${teacher.email ? `<div><i class="fas fa-envelope" style="margin-right: 5px;"></i> ${teacher.email}</div>` : ''}
              </div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
    
    return `
      <p>Here are the teachers I found. You can view them in the full directory:</p>
      <ul>
        ${teachers.slice(0, 5).map(teacher => `
          <li>
            <strong>${teacher.name}</strong>
            ${teacher.grade ? ` (${teacher.grade})` : ''}
            ${teacher.subjects ? ` - Teaches: ${teacher.subjects.join(', ')}` : ''}
          </li>
        `).join('')}
        ${teachers.length > 5 ? `<li>...and ${teachers.length - 5} more</li>` : ''}
      </ul>
      <button onclick="initializeTeachersDisplay()" style="margin-top: 10px; padding: 8px 15px; background: #ff7b25; color: white; border: none; border-radius: 5px; cursor: pointer;">
        <i class="fas fa-users"></i> View Full Teachers Directory
      </button>
    `;
  }
}

const teachersQuery = new TeachersQuery();

