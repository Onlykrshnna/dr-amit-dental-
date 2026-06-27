const fs = require('fs');

const updateFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    const replacements = [
        // Names
        [/Shankari Smile Studio/gi, "Dr. Harshal's dental Clinic"],
        [/Shankari Dental/gi, "Dr. Harshal's dental Clinic"],
        [/Shankari/gi, "Dr. Harshal's"],
        
        // Locations
        [/Bhargavi Platinum # 38\/4 first floor 3rd cross, Sahakarnagar Main Rd, G Block/gi, 'Shop No. 3, Pendse Bhawan, Tilak Rd, opposite Durvankur Dining Hall, Sadashiv Peth'],
        [/Bhargavi Platinum # 38\/4, 3rd Cross, Sahakarnagar Main Rd, G Block/gi, 'Shop No. 3, Pendse Bhawan, Tilak Rd, opposite Durvankur Dining Hall, Sadashiv Peth'],
        [/Bhargavi Platinum # 38\/4, 3rd Cross, Sahakarnagar Main Rd/gi, 'Shop No. 3, Pendse Bhawan, Tilak Rd'],
        [/↳ West of Chord Road, Sahakar Nagar/gi, 'Located in: Pendse Bhawan | Plus code: GR6W+79 Pune, Maharashtra'],
        [/Sahakar Nagar, Bengaluru/gi, 'Sadashiv Peth, Pune'],
        [/Sahakar Nagar/gi, 'Sadashiv Peth'],
        [/Bengaluru/gi, 'Pune'],
        [/Karnataka 560092/gi, 'Maharashtra 411030'],
        [/Karnataka/gi, 'Maharashtra'],
        [/560092/gi, '411030'],
        
        // Phone/Contact
        [/\+916366614266/g, '08888478098'],
        [/6366614266/g, '8888478098'],
        [/\+91 98765 43210/g, '088884 78098'],
        [/hello@shankarismile\.com/g, 'info@drharshalsdental.com'],
        
        // Rating
        [/5\.0★/g, '4.9★'],
        [/5\.0/g, '4.9'],
        [/4\.9 · 195/g, '4.9 · 276'],
        [/144 patients/g, '276 patients'],
        [/144 reviews/gi, '276 reviews'],
        [/144/g, '276'],
        [/195 Reviews/gi, '276 Reviews'],
        [/195/g, '276'],
        
        // Map link
        [/Shankari\+Dental\+Clinic\+Sahakar\+Nagar\+Bengaluru/gi, 'Dr+Harshals+dental+Clinic+Sadashiv+Peth+Pune']
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
indexHtml = indexHtml.replace(/<span>Shankari<\/span> <span>Dental<\/span> <span>Clinic<\/span>/gi, "<span>Dr. Harshal's</span> <span>dental</span> <span>Clinic</span>");
indexHtml = indexHtml.replace(/<span>Shankari<\/span> <span>Smile<\/span> <span>Studio<\/span>/gi, "<span>Dr. Harshal's</span> <span>dental</span> <span>Clinic</span>");

// Specifically update the brand dots
indexHtml = indexHtml.replace(/Shankari Dental<span class="dot">\.<\/span>/gi, 'Dr. Harshal\'s dental Clinic<span class="dot">.</span>');

// Title with Hindi Name
indexHtml = indexHtml.replace(/<title>.*?<\/title>/g, "<title>Dr. Harshal's dental Clinic (डॉ. हर्षल'स डेंटल क्लिनिक) — Premium Dental Care | Sadashiv Peth, Pune</title>");
indexHtml = indexHtml.replace(/<div class="hero-label" id="heroLabel">Sadashiv Peth · Pune<\/div>/, '<div class="hero-label" id="heroLabel">डॉ. हर्षल\'स डेंटल क्लिनिक · Sadashiv Peth, Pune</div>');

// Team / Doctor Name
indexHtml = indexHtml.replace(/Our Expert Dental Team/gi, 'Dr. Harshal');
indexHtml = indexHtml.replace(/our expert team/gi, 'Dr. Harshal');

// Testimonials Replacement
const testTrackRegex = /<div class="test-track" id="testTrack">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;
const match = indexHtml.match(testTrackRegex);

const review1 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"Dr. Harshal is an excellent dentist! I' ve her patient for the past two years and have received various treatment from her. My first visit was to fix a dislodged dental cap, and I was truly impressed with the quality and service. Unlike my …"</p>
        <div class="test-card-author">
          <div class="test-card-avatar">KG</div>
          <div><div class="test-card-name">Kirti Garud</div><div class="test-card-location">Pune</div></div>
        </div>
      </div>`;
const review2 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"Since it was my first time, I was a bit unsure, but it turned out to be a really smooth and comfortable experience"</p>
        <div class="test-card-author">
          <div class="test-card-avatar">DS</div>
          <div><div class="test-card-name">Deepa Sharma</div><div class="test-card-location">Pune</div></div>
        </div>
      </div>`;
const review3 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"I just wanted to express my sincere appreciation for the excellent care and professionalism you've consistently shown during my visits. Your gentle approach, clear explanations, and genuine concern for your patients make a big difference. I …"</p>
        <div class="test-card-author">
          <div class="test-card-avatar">AT</div>
          <div><div class="test-card-name">Anukul Tayade</div><div class="test-card-location">Pune</div></div>
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

fs.writeFileSync('public/index.html', indexHtml);
console.log("Global replacements for Harshal Dental complete.");
