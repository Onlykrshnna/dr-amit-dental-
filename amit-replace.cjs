const fs = require('fs');

const updateFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    const replacements = [
        // Names
        [/Dr\. Harshal's dental Clinic/gi, "Dr Amit's dental clinic"],
        [/Dr\. Harshal's/gi, "Dr Amit's"],
        [/Dr\. Harshal/gi, "Dr. Amit"],
        
        // Locations
        [/Shop No\. 3, Pendse Bhawan, Tilak Rd, opposite Durvankur Dining Hall, Sadashiv Peth/gi, 'sugan Singh circle, opposite kachhawah hotel, Sainik Basti, Nagaur'],
        [/Shop No\. 3, Pendse Bhawan, Tilak Rd/gi, 'sugan Singh circle, opposite kachhawah hotel, Sainik Basti'],
        [/Located in: Pendse Bhawan \| Plus code: GR6W\+79 Pune, Maharashtra/gi, 'Nagaur, Rajasthan'],
        [/Sadashiv Peth, Pune/gi, 'Nagaur, Rajasthan'],
        [/Sadashiv Peth/gi, 'Nagaur'],
        [/Pune/gi, 'Nagaur'],
        [/Maharashtra 411030/gi, 'Rajasthan 341001'],
        [/Maharashtra/gi, 'Rajasthan'],
        [/411030/gi, '341001'],
        
        // Phone/Contact
        [/08888478098/g, '09414390109'],
        [/8888478098/g, '9414390109'],
        [/088884 78098/g, '094143 90109'],
        [/info@drharshalsdental\.com/g, 'info@dramitsdental.com'],
        
        // Rating
        [/4\.9★/g, '5.0★'],
        [/4\.9/g, '5.0'],
        [/4\.9 · 276/g, '5.0 · 33'],
        [/276 patients/g, '33 patients'],
        [/276 reviews/gi, '33 reviews'],
        [/276/g, '33'],
        [/276 Reviews/gi, '33 Reviews'],
        
        // Map link
        [/Dr\+Harshals\+dental\+Clinic\+Sadashiv\+Peth\+Pune/gi, 'Dr+Amits+dental+clinic+Nagaur+Rajasthan']
    ];

    for (let [pattern, replacement] of replacements) {
        content = content.replace(pattern, replacement);
    }

    fs.writeFileSync(filePath, content);
};

updateFile('public/index.html');
updateFile('src/routes/index.tsx');

// Also update the preloader specifically in index.html
let indexHtml = fs.readFileSync('public/index.html', 'utf8');

// Title with Hindi Name
indexHtml = indexHtml.replace(/डॉ\. हर्षल'स डेंटल क्लिनिक/g, "डॉ. अमित'स डेंटल क्लिनिक");

// Testimonials Replacement
const testTrackRegex = /<div class="test-track" id="testTrack">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;
const match = indexHtml.match(testTrackRegex);

const review1 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"Best place to get th treatment..."</p>
        <div class="test-card-author">
          <div class="test-card-avatar">AP</div>
          <div><div class="test-card-name">Abhishek Purohit</div><div class="test-card-location">Nagaur</div></div>
        </div>
      </div>`;
const review2 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"All of the staff were extremely friendly and helpful."</p>
        <div class="test-card-author">
          <div class="test-card-avatar">AS</div>
          <div><div class="test-card-name">AMJAD SAIYYAD ZARNISH CLINIC</div><div class="test-card-location">Nagaur</div></div>
        </div>
      </div>`;
const review3 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"Very good experience"</p>
        <div class="test-card-author">
          <div class="test-card-avatar">MV</div>
          <div><div class="test-card-name">Monika Vyas</div><div class="test-card-location">Nagaur</div></div>
        </div>
      </div>`;

if (match) {
    const newTestTrackInner = `
${review1}
${review2}
${review3}
<!-- Duplicate for infinite scroll -->
${review1}
${review2}
${review3}
    `;
    indexHtml = indexHtml.replace(match[1], newTestTrackInner);
}

// Hero subtitle replacement
indexHtml = indexHtml.replace(/Healthy teeth and gums start with the right habits\. Visit Dr Amit's dental clinic for advanced, painless, and personalized dental treatments\./gi, "We provide best dental treatment in affordable prices...");
indexHtml = indexHtml.replace(/Healthy teeth and gums start with the right habits\./gi, "We provide best dental treatment in affordable prices...");

fs.writeFileSync('public/index.html', indexHtml);
console.log("Global replacements for Amit Dental complete.");
