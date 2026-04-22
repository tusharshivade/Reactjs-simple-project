const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database setup
const dbFile = path.join(__dirname, 'chat.db');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      accountType TEXT DEFAULT 'student',
      skills TEXT DEFAULT '[]',
      points INTEGER DEFAULT 0,
      streaks INTEGER DEFAULT 0,
      badges TEXT DEFAULT '[]',
      bio TEXT,
      profilePic TEXT,
      joinDate DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Create roadmap_progress table
    db.run(`CREATE TABLE IF NOT EXISTS roadmap_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      roadmapType TEXT,
      stepIndex INTEGER,
      completedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(userId, roadmapType, stepIndex)
    )`);

    // Create interviews table
    db.run(`CREATE TABLE IF NOT EXISTS interviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      requesterId INTEGER,
      partnerId INTEGER,
      domain TEXT,
      status TEXT DEFAULT 'pending',
      scheduledAt DATETIME,
      feedback TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create contributions table
    db.run(`CREATE TABLE IF NOT EXISTS contributions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      repoName TEXT,
      issueUrl TEXT,
      status TEXT DEFAULT 'completed',
      pointsAwarded INTEGER DEFAULT 50,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Create messages table
    db.run(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT,
      content TEXT,
      imageUrl TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create aptitude_results table
    db.run(`CREATE TABLE IF NOT EXISTS aptitude_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      category TEXT,
      logicScore INTEGER,
      securityScore INTEGER,
      efficiencyScore INTEGER,
      syntaxScore INTEGER,
      architectureScore INTEGER,
      aiFeedback TEXT,
      attemptDate DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    console.log('Database tables ready');

    // Helper to add columns if they don't exist
    const addColumn = (table, column, type) => {
      db.run(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`, (err) => {
        // Ignore error if column already exists
      });
    };

    addColumn('users', 'skills', "TEXT DEFAULT '[]'");
    addColumn('users', 'points', 'INTEGER DEFAULT 0');
    addColumn('users', 'streaks', 'INTEGER DEFAULT 0');
    addColumn('users', 'badges', "TEXT DEFAULT '[]'");
    addColumn('users', 'bio', 'TEXT');
    addColumn('users', 'profilePic', 'TEXT');
  }
});


// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'project-architecture-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// API Routes

// 1. Get all messages
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY id ASC', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ messages: rows });
  });
});

// 2. Save a message
app.post('/api/messages', (req, res) => {
  const { role, content, imageUrl } = req.body;
  db.run(
    'INSERT INTO messages (role, content, imageUrl) VALUES (?, ?, ?)',
    [role, content, imageUrl || null],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        role,
        content,
        imageUrl,
        timestamp: new Date().toISOString()
      });
    }
  );
});

// 3. Clear chat (optional utility)
app.delete('/api/messages', (req, res) => {
  db.run('DELETE FROM messages', function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'All messages deleted' });
  });
});

// 4. Upload an image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }
  // Construct the URL to access the uploaded image
  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ imageUrl, filename: req.file.filename });
});

// ======================== AUTH ROUTES ========================

// 5. Signup - Create new user
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password, accountType } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }
  
  // Check if user already exists
  db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    // Insert new user
    db.run(
      'INSERT INTO users (name, email, password, accountType) VALUES (?, ?, ?, ?)',
      [name, email, password, accountType || 'student'],
      function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({
          id: this.lastID,
          name,
          email,
          accountType: accountType || 'student',
          joinDate: new Date().toISOString()
        });
      }
    );
  });
});

// 6. Login - Authenticate user
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      joinDate: user.joinDate
    });
  });
});

// 8. Update User Profile
app.put('/api/auth/profile', (req, res) => {
  const userId = req.headers['x-user-id'];
  const { skills, bio, name } = req.body;
  
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });

  db.run(
    'UPDATE users SET skills = ?, bio = ?, name = ? WHERE id = ?',
    [JSON.stringify(skills || []), bio, name, userId],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Profile updated successfully' });
    }
  );
});

// ======================== ROADMAP ROUTES ========================

// 9. Get Roadmap Progress
app.get('/api/roadmaps/:userId', (req, res) => {
  const { userId } = req.params;
  db.all('SELECT * FROM roadmap_progress WHERE userId = ?', [userId], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ progress: rows });
  });
});

// 10. Toggle Roadmap Step
app.post('/api/roadmaps/toggle', (req, res) => {
  const { userId, roadmapType, stepIndex } = req.body;
  
  db.get(
    'SELECT id FROM roadmap_progress WHERE userId = ? AND roadmapType = ? AND stepIndex = ?',
    [userId, roadmapType, stepIndex],
    (err, row) => {
      if (err) return res.status(400).json({ error: err.message });
      
      if (row) {
        // Remove if exists
        db.run('DELETE FROM roadmap_progress WHERE id = ?', [row.id], (err) => {
          if (err) return res.status(400).json({ error: err.message });
          res.json({ status: 'removed', points: -10 });
        });
      } else {
        // Add if not exists
        db.run(
          'INSERT INTO roadmap_progress (userId, roadmapType, stepIndex) VALUES (?, ?, ?)',
          [userId, roadmapType, stepIndex],
          function(err) {
            if (err) return res.status(400).json({ error: err.message });
            // Award points
            db.run('UPDATE users SET points = points + 10 WHERE id = ?', [userId]);
            res.json({ status: 'added', points: 10 });
          }
        );
      }
    }
  );
});

// ======================== INTERVIEW ROUTES ========================

// 11. Get Interviews
app.get('/api/interviews', (req, res) => {
  db.all('SELECT i.*, u.name as requesterName FROM interviews i JOIN users u ON i.requesterId = u.id WHERE status = "pending"', (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ interviews: rows });
  });
});

// 12. Book/Request Interview
app.post('/api/interviews/request', (req, res) => {
  const { userId, domain, scheduledAt } = req.body;
  db.run(
    'INSERT INTO interviews (requesterId, domain, scheduledAt) VALUES (?, ?, ?)',
    [userId, domain, scheduledAt],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Interview requested' });
    }
  );
});

// ======================== CONTRIBUTION ROUTES ========================

// 13. Log Contribution
app.post('/api/contributions', (req, res) => {
  const { userId, repoName, issueUrl } = req.body;
  db.run(
    'INSERT INTO contributions (userId, repoName, issueUrl) VALUES (?, ?, ?)',
    [userId, repoName, issueUrl],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      // Award points
      db.run('UPDATE users SET points = points + 50 WHERE id = ?', [userId]);
      res.json({ id: this.lastID, message: 'Contribution logged (50 points awarded)' });
    }
  );
});

app.get('/api/contributions/:userId', (req, res) => {
  db.all('SELECT * FROM contributions WHERE userId = ?', [req.params.userId], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ contributions: rows });
  });
});

// ======================== APTITUDE ROUTES ========================

// 14. Log Aptitude Result
app.post('/api/aptitude/results', (req, res) => {
  const { userId, category, scores, aiFeedback } = req.body;
  const { logic, security, efficiency, syntax, architecture } = scores;
  
  db.run(
    'INSERT INTO aptitude_results (userId, category, logicScore, securityScore, efficiencyScore, syntaxScore, architectureScore, aiFeedback) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [userId, category, logic, security, efficiency, syntax, architecture, aiFeedback],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      // Award points for completing an aptitude test
      db.run('UPDATE users SET points = points + 100 WHERE id = ?', [userId]);
      res.json({ id: this.lastID, message: 'Aptitude result logged (100 points awarded)' });
    }
  );
});

// 15. Get Aptitude Results
app.get('/api/aptitude/results/:userId', (req, res) => {
  db.all('SELECT * FROM aptitude_results WHERE userId = ? ORDER BY attemptDate DESC', [req.params.userId], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ results: rows });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
