const XLSX = require('xlsx');

const headers = [
  'S.No','Key','Title','Description','Type','Status','Priority',
  'Story Points','Epic','Feature','Module','Acceptance Criteria',
  'Technical Notes','Assignee','Created By','Created At','Updated At',
  'Tags','Business Value','Complexity','Technical Risk'
];

const modules = [
  'User Authentication','Product Search','Product Detail','Shopping Cart',
  'Checkout & Payment','Order Management','Shipping & Delivery','Returns & Refunds',
  'Reviews & Ratings','Wishlist','Amazon Prime','Grocery & Fresh',
  'Seller Marketplace','Advertising','Customer Service','Notifications',
  'Gift Cards','Mobile App','Kindle & Digital','Amazon Business'
];

const epics = [
  'User Registration & Login','Password Management','Account Profile',
  'Address Book','Search Bar','Search Filters','Advanced Search',
  'Voice & Visual Search','Product Information','Pricing & Availability',
  'Product Variants','Product Media','Cart Management','Cart Pricing',
  'Save for Later','Checkout Flow','Payment Methods','Order Confirmation',
  'Order Tracking','Order History','Order Cancellation','Shipping Options',
  'Amazon Locker','Return Initiation','Refund Processing','Exchange & Replacement',
  'Product Reviews','Review Moderation','Wishlist Management','Registry & Lists',
  'Prime Membership','Prime Benefits','Grocery Shopping','Fresh Delivery Slots',
  'Seller Registration','Product Listing','Inventory Management','Sponsored Products',
  'Deals & Promotions','Live Chat & Support','Self-Service Help','A-to-Z Guarantee',
  'Push Notifications','Email Notifications','Gift Card Purchase','Gift Card Redemption',
  'App Navigation','Mobile Features','Kindle Store','Kindle Reading',
  'Business Account','Business Analytics','Daily Deals','Subscribe & Save',
  'Alexa Devices','Kindle Devices','Amazon Pay Wallet','Payment Security',
  'Accessibility Features','Language & Localization','Recommendation Engine',
  'Browse Personalization','Affiliate Program','Influencer Program',
  'Subscription Management','Pantry Ordering','Amazon Photos','Amazon Drive',
  'Music Streaming','Playlists & Library','Prime Video Discovery','Video Playback',
  'Luxury Store','Trade-In Program','Amazon Pharmacy','Amazon Clinic',
  'Sustainable Packaging','Climate Pledge','Fake Review Detection','Account Security',
  'Sales Analytics','Customer Analytics','FBA Inventory','FBA Fees & Reporting',
  'International Shopping','Customs & Compliance','Kids+ Content','Family Sharing',
  'Pay on Delivery','Regional Language','Privacy & Data','Terms & Compliance',
  'Brand Registry','CI/CD & DevOps','Performance Testing','Security Testing',
  'API Testing','Database Testing','Load Testing','Regression Suite',
  'Smoke Testing','User Acceptance Testing'
];

const features = [
  'Email Registration','Phone Registration','Social Sign-Up','Email Login',
  'MFA','Biometric Login','Forgot Password','Change Password','Password Strength',
  'Personal Info Update','Contact Info','Profile Photo','Add Address','Edit Address',
  'Address Validation','Keyword Search','Autocomplete','Search History',
  'Category Filter','Price Range Filter','Sort Options','Department Search',
  'Brand Filter','Condition Filter','Voice Input','Voice Accuracy','Alexa Integration',
  'Camera Search','Barcode Scan','Screenshot Search','Product Title & Images',
  'Product Description','Technical Specs','Price Display','Stock Availability',
  'Sold By Info','Size Selection','Color Selection','Bundle Selection',
  'Image Gallery','Product Video','AR View','Add to Cart','Update Quantity',
  'Remove from Cart','Price Breakdown','Coupon Code','Cart Persistence',
  'Move to Save for Later','Move Back to Cart','Save for Later Price Track',
  'Guest Checkout','One-Click Purchase','Multi-Step Checkout','Credit Card Payment',
  'Amazon Pay','EMI & BNPL','Order Summary','Order Confirmation Page',
  'Invoice Generation','Real-Time Tracking','Delivery Notifications',
  'Third-Party Courier Tracking','View Past Orders','Order Detail View',
  'Reorder','Cancel Before Shipment','Partial Cancellation','Cancel Reason',
  'Standard Shipping','Express Delivery','Delivery Instructions',
  'Locker Selection','Locker Pickup Notification','Pickup Point Partners',
  'Self-Service Return','Return Window','Return Label','Refund Method',
  'Refund Status','Instant Refund','Item Exchange','Damaged Item Replacement',
  'Missing Item Claim','Write a Review','Review with Media','Edit/Delete Review',
  'Helpful Voting','Report Review','Verification Badge','Create Wishlist',
  'Add to Wishlist','Wishlist Sharing','Baby Registry','Wedding Registry',
  'Price Drop Alerts','Prime Sign-Up','Prime Renewal','Prime Cancellation',
  'Prime Free Delivery','Prime Video','Prime Music','Browse Grocery',
  'Recurring Orders','Freshness Guarantee','Time Slot Selection',
  'Same-Day Grocery','Delivery Pass'
];

const priorities = ['Low','Medium','High','Critical'];
const statuses = ['Draft','In Progress','In Review','Completed'];
const defectStatuses = ['New','Assigned','Resolved','Fixed','Reopen','Deferred','Not a Defect'];
const complexities = ['Low','Medium','High'];
const risks = ['Low','Medium','High'];
const businessValues = ['Low','Medium','High','Critical'];
const storyPoints = [1,2,3,5,8,13];
const tags = [
  'auth,security','cart,ui','search,performance','payment,security',
  'ux,mobile','api,backend','database,query','ui,accessibility',
  'notification,email','tracking,shipping','refund,payment',
  'review,content','wishlist,ux','prime,membership','grocery,fresh',
  'seller,marketplace','ads,campaign','support,chat','gift,cards',
  'kindle,digital','alexa,voice','ci-cd,devops','load,performance',
  'regression,automation','smoke,sanity','security,pentest'
];

function rnd(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function rndInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function fmtDate(d){ return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`; }
const BASE = new Date('2026-06-01');
function randDate(){ const d=new Date(BASE); d.setDate(d.getDate()+rndInt(0,27)); return fmtDate(d); }

const rows = [headers];
let sno = 1;

// ── EPICS (100) ──────────────────────────────────────────────────────────────
for(let i=0;i<100;i++){
  const epic = epics[i] || `Epic ${i+1}`;
  const mod  = modules[i%modules.length];
  const cd   = randDate(), ud = randDate();
  rows.push([
    sno++,
    `EP_${String(i+1).padStart(3,'0')}`,
    epic,
    `Deliver end-to-end capability for ${epic} across the Amazon platform`,
    'Epic',
    rnd(statuses),
    rnd(['High','Critical','Medium']),
    '',
    epic,
    '',
    mod,
    `All features under ${epic} are delivered, tested, and meet DoD`,
    `Decompose into features; track via feature flags; align with Q3 roadmap`,
    'Unassigned','Ganesh',cd,ud,
    `epic,${mod.toLowerCase().replace(/ /g,'-')}`,
    rnd(businessValues),rnd(complexities),rnd(risks)
  ]);
}

// ── FEATURES (300) ───────────────────────────────────────────────────────────
for(let i=0;i<300;i++){
  const feat  = features[i%features.length] + (i>=features.length ? ` v${Math.floor(i/features.length)+1}` : '');
  const epic  = epics[i%epics.length];
  const mod   = modules[i%modules.length];
  const cd    = randDate(), ud = randDate();
  rows.push([
    sno++,
    `FT_${String(i+1).padStart(3,'0')}`,
    feat,
    `Implement ${feat} so that users can interact with ${mod} efficiently`,
    'Feature',
    rnd(statuses),
    rnd(['High','Medium','Low']),
    rnd(storyPoints),
    epic,
    feat,
    mod,
    `Feature is functional, responsive, and passes all acceptance tests for ${feat}`,
    `Follow existing design system; ensure API contracts are met; write unit tests`,
    'Unassigned','Ganesh',cd,ud,
    rnd(tags),
    rnd(businessValues),rnd(complexities),rnd(risks)
  ]);
}

// ── STORIES (600) ────────────────────────────────────────────────────────────
const storyTemplates = [
  (f,m)=>[`As a user I can ${f} so that I complete my goal in ${m}`,
          `Given I am on the ${m} page, When I use ${f}, Then the action succeeds and I see confirmation`],
  (f,m)=>[`As a registered user I want to access ${f} so that my ${m} experience is seamless`,
          `Given I am logged in, When I navigate to ${f}, Then all elements load within 2 seconds`],
  (f,m)=>[`As a mobile user I can use ${f} on small screens so that ${m} works on all devices`,
          `Given I am on a 375px viewport, When I interact with ${f}, Then layout does not break`],
  (f,m)=>[`As a Prime member I get enhanced ${f} so that ${m} benefits are unlocked`,
          `Given I have an active Prime subscription, When I use ${f}, Then Prime benefits apply automatically`],
  (f,m)=>[`As a first-time user I am guided through ${f} so that onboarding to ${m} is smooth`,
          `Given I am a new user, When I access ${f} for the first time, Then I see a tooltip or walkthrough`],
  (f,m)=>[`As a seller I can configure ${f} so that my ${m} listings are optimised`,
          `Given I am on the Seller Central page, When I set up ${f}, Then changes are saved and reflected within 5 minutes`],
];

for(let i=0;i<600;i++){
  const feat  = features[i%features.length];
  const epic  = epics[i%epics.length];
  const mod   = modules[i%modules.length];
  const tmpl  = storyTemplates[i%storyTemplates.length](feat,mod);
  const cd    = randDate(), ud = randDate();
  rows.push([
    sno++,
    `ST_${String(i+1).padStart(3,'0')}`,
    `${feat} — story ${(i%6)+1}`,
    tmpl[0],
    'Story',
    rnd(statuses),
    rnd(priorities),
    rnd(storyPoints),
    epic,
    feat,
    mod,
    tmpl[1],
    `Ensure edge cases covered; add to regression suite; peer review required`,
    'Unassigned','Ganesh',cd,ud,
    rnd(tags),
    rnd(businessValues),rnd(complexities),rnd(risks)
  ]);
}

// ── DEFECTS (300) ────────────────────────────────────────────────────────────
const defectTemplates = [
  (f,m)=>`${f} page shows blank screen on Safari 16 in ${m} module`,
  (f,m)=>`${f} API returns 500 error when payload exceeds 1MB in ${m}`,
  (f,m)=>`${f} UI element overlaps footer on 320px viewport in ${m}`,
  (f,m)=>`${f} does not persist state after browser refresh in ${m}`,
  (f,m)=>`${f} shows incorrect count badge after action in ${m}`,
  (f,m)=>`${f} validation error message is not displayed in ${m}`,
  (f,m)=>`${f} button is unresponsive on first tap on iOS in ${m}`,
  (f,m)=>`${f} search results do not update after filter change in ${m}`,
  (f,m)=>`${f} spinner never disappears when network is slow in ${m}`,
  (f,m)=>`${f} date picker crashes on Android 12 in ${m}`,
];
const defectDescTemplates = [
  (f,m)=>`Steps: 1) Navigate to ${m} 2) Trigger ${f} 3) Observe unexpected behaviour. Expected: Works correctly. Actual: Error/blank/crash.`,
  (f,m)=>`Reproduce: Open ${m} on affected browser/device, perform ${f} action. The UI breaks or API fails unexpectedly.`,
  (f,m)=>`When ${f} is invoked in ${m}, the system throws an unhandled exception visible in the console.`,
];

for(let i=0;i<300;i++){
  const feat = features[i%features.length];
  const epic = epics[i%epics.length];
  const mod  = modules[i%modules.length];
  const cd   = randDate(), ud = randDate();
  rows.push([
    sno++,
    `BUG_${String(i+1).padStart(3,'0')}`,
    defectTemplates[i%defectTemplates.length](feat,mod),
    defectDescTemplates[i%defectDescTemplates.length](feat,mod),
    'Defect',
    rnd(defectStatuses),
    rnd(['Critical','High','Medium','Low']),
    rnd([1,2,3]),
    epic,feat,mod,
    `Bug is fixed; no regression introduced; verified on affected browsers/devices`,
    `Check console logs; attach HAR file; verify fix with unit + integration tests`,
    'Unassigned','Ganesh',cd,ud,
    rnd(tags)+',bug',
    rnd(businessValues),rnd(complexities),rnd(risks)
  ]);
}

// ── TASKS (200) ──────────────────────────────────────────────────────────────
const taskTitles = [
  (f,m)=>`Write unit tests for ${f} in ${m}`,
  (f,m)=>`Update API documentation for ${f} endpoint in ${m}`,
  (f,m)=>`Refactor ${f} component for reusability in ${m}`,
  (f,m)=>`Set up CI pipeline for ${m} regression`,
  (f,m)=>`Create test data fixtures for ${f} in ${m}`,
  (f,m)=>`Performance profiling for ${f} in ${m}`,
  (f,m)=>`Code review for ${f} PR in ${m}`,
  (f,m)=>`Update design tokens for ${f} in ${m}`,
  (f,m)=>`Database migration script for ${m} schema update`,
  (f,m)=>`Security audit for ${f} in ${m}`,
];
const taskDesc = (f,m)=>
  `Technical task: ${f} in ${m} module needs attention as part of sprint cleanup or tech debt reduction.`;

for(let i=0;i<200;i++){
  const feat = features[i%features.length];
  const epic = epics[i%epics.length];
  const mod  = modules[i%modules.length];
  const cd   = randDate(), ud = randDate();
  rows.push([
    sno++,
    `TK_${String(i+1).padStart(3,'0')}`,
    taskTitles[i%taskTitles.length](feat,mod),
    taskDesc(feat,mod),
    'Task',
    rnd(statuses),
    rnd(['High','Medium','Low']),
    rnd(storyPoints),
    epic,feat,mod,
    `Task completed, reviewed, and merged to main branch`,
    `Follow team coding standards; link PR to this ticket; update changelog`,
    'Unassigned','Ganesh',cd,ud,
    rnd(tags)+',task',
    rnd(businessValues),rnd(complexities),rnd(risks)
  ]);
}

// ── BUILD WORKBOOK ───────────────────────────────────────────────────────────
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(rows);

// Column widths
ws['!cols'] = [
  {wch:6},{wch:10},{wch:45},{wch:70},{wch:10},{wch:12},{wch:10},
  {wch:10},{wch:30},{wch:28},{wch:22},{wch:55},{wch:55},
  {wch:14},{wch:12},{wch:12},{wch:12},{wch:28},{wch:14},{wch:12},{wch:14}
];

XLSX.utils.book_append_sheet(wb, ws, 'Amazon_Backlog');
XLSX.writeFile(wb,'Amazon_Backlog.xlsx');
console.log('Done — rows written: '+(rows.length-1));
