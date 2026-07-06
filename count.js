const XLSX = require('xlsx');
const wb = XLSX.readFile('Amazon_Backlog.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws);

const types    = ['Epic','Feature','Story','Task','Defect'];
const statCols = {
  Epic:    ['Draft','In Progress','In Review','Completed'],
  Feature: ['Draft','In Progress','In Review','Completed'],
  Story:   ['Draft','In Progress','In Review','Completed'],
  Task:    ['Draft','In Progress','In Review','Completed'],
  Defect:  ['New','Assigned','Resolved','Fixed','Reopen','Deferred','Not a Defect'],
};
const prioList = ['Low','Medium','High','Critical'];

const stat  = {}; // stat[type][status] = count
const prio  = {}; // prio[type][priority] = count
const total = {}; // total[type] = count

types.forEach(t => {
  stat[t]  = {};
  prio[t]  = {};
  total[t] = 0;
});

rows.forEach(r => {
  const t = r['Type'];
  if(!types.includes(t)) return;
  total[t]++;
  const s = r['Status'] || 'Unknown';
  const p = r['Priority'] || 'Unknown';
  stat[t][s] = (stat[t][s] || 0) + 1;
  prio[t][p] = (prio[t][p] || 0) + 1;
});

console.log('\n========================================');
console.log('  AMAZON BACKLOG — STATUS & PRIORITY BREAKDOWN');
console.log('========================================\n');

types.forEach(t => {
  console.log(`──────────────────────────────────────`);
  console.log(`  ${t.toUpperCase()}  (Total: ${total[t]})`);
  console.log(`──────────────────────────────────────`);

  console.log('  STATUS:');
  (statCols[t] || []).forEach(s => {
    const c = stat[t][s] || 0;
    const bar = '█'.repeat(Math.round(c/(total[t]||1)*20));
    console.log(`    ${s.padEnd(15)} : ${String(c).padStart(4)}  ${bar}`);
  });

  console.log('  PRIORITY:');
  prioList.forEach(p => {
    const c = prio[t][p] || 0;
    const bar = '█'.repeat(Math.round(c/(total[t]||1)*20));
    console.log(`    ${p.padEnd(15)} : ${String(c).padStart(4)}  ${bar}`);
  });
  console.log('');
});

console.log('========================================');
console.log(`  GRAND TOTAL: ${Object.values(total).reduce((a,b)=>a+b,0)} items`);
console.log('========================================\n');
