// feesDisplay.js

class FeesDisplay {
  constructor() {
    this.db = feesDatabase;
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
      .fees-container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.18);
      }

      .fees-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }

      .fees-title {
        font-size: 1.8rem;
        color: #ff7b25;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .fees-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }

      .fees-tab {
        padding: 8px 16px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s;
      }

      .fees-tab:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .fees-tab.active {
        background: #ff7b25;
      }

      .fee-section {
        margin-bottom: 30px;
      }

      .section-title {
        font-size: 1.3rem;
        color: #ffd166;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .fee-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
      }

      .fee-table th {
        background: rgba(255, 123, 37, 0.3);
        padding: 12px 15px;
        text-align: left;
      }

      .fee-table td {
        padding: 12px 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .fee-table tr:hover {
        background: rgba(255, 123, 37, 0.1);
      }

      .policy-list {
        list-style-type: none;
        padding-left: 0;
      }

      .policy-item {
        margin-bottom: 10px;
        padding-left: 20px;
        position: relative;
      }

      .policy-item:before {
        content: "•";
        color: #ff7b25;
        position: absolute;
        left: 0;
      }

      .bank-details {
        background: rgba(26, 26, 46, 0.7);
        padding: 15px;
        border-radius: 10px;
        margin-top: 20px;
      }

      .bank-item {
        margin-bottom: 8px;
      }

      @media (max-width: 768px) {
        .fees-tabs {
          flex-direction: column;
        }
        
        .fee-table {
          display: block;
          overflow-x: auto;
        }
      }
    `;
    document.head.appendChild(style);
  }

  renderDefaultView() {
    const container = document.createElement('div');
    container.className = 'fees-container';
    container.innerHTML = `
      <div class="fees-header">
        <h2 class="fees-title">
          <i class="fas fa-money-bill-wave"></i> CHIS Fee Structure
        </h2>
      </div>

      <div class="fees-tabs">
        <div class="fees-tab active" data-level="pre-school">Pre-School</div>
        <div class="fees-tab" data-level="primary">Primary (G1-G6)</div>
        <div class="fees-tab" data-level="jhs">JHS</div>
        <div class="fees-tab" data-level="ils">ILS</div>
      </div>

      <div id="feesView">
        ${this.renderFeeStructure(this.db.preSchool)}
      </div>
    `;

    document.getElementById('chatBody').appendChild(container);
  }

  renderFeeStructure(feeStructure) {
    return `
      <div class="fee-section">
        <h3 class="section-title">Admission Fees</h3>
        <table class="fee-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Fresh Pupils (GHC)</th>
              <th>Continuing Pupils (GHC)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>New Admission</td>
              <td>${feeStructure.admission.fresh.toFixed(2)}</td>
              <td>${feeStructure.admission.continuing.toFixed(2)}</td>
            </tr>
            <tr>
              <td>First Aid and Maintenance</td>
              <td>-</td>
              <td>${feeStructure.firstAid.toFixed(2)}</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>${feeStructure.admission.fresh.toFixed(2)}</strong></td>
              <td><strong>${(feeStructure.admission.continuing + feeStructure.firstAid).toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="fee-section">
        <h3 class="section-title">Optional Fees</h3>
        <table class="fee-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount (GHC)</th>
            </tr>
          </thead>
          <tbody>
            ${feeStructure.optional.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.amount.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="fee-section">
        <h3 class="section-title">Payment Policy</h3>
        <ul class="policy-list">
          ${feeStructure.policy.map(item => `
            <li class="policy-item">${item}</li>
          `).join('')}
        </ul>
      </div>

      <div class="bank-details">
        <h3 class="section-title">Bank Details</h3>
        ${feeStructure.banks.map(bank => `
          <div class="bank-item">${bank}</div>
        `).join('')}
      </div>
    `;
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-level]')) {
        const level = e.target.closest('[data-level]').dataset.level;
        document.querySelectorAll('[data-level]').forEach(tab => {
          tab.classList.toggle('active', tab.dataset.level === level);
        });
        
        const feesView = document.getElementById('feesView');
        feesView.innerHTML = this.renderFeeStructure(this.db.getFeeStructureByLevel(level));
      }
    });
  }
}

// Initialize when added to chatty.html
function initializeFeesDisplay() {
  new FeesDisplay();
}