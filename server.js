const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

app.use((error, req, res, next) => {
  if (req.path.startsWith('/api')) {
    res.status(400).json({
      success: false,
      message: 'Invalid JSON request body.'
    });
    return;
  }

  next(error);
});

function readJsonFile(fileName, res) {
  const filePath = path.join(__dirname, 'data', fileName);

  fs.readFile(filePath, 'utf8', (error, fileContent) => {
    if (error) {
      res.status(500).json({
        message: `Could not read ${fileName}.`
      });
      return;
    }

    try {
      const data = JSON.parse(fileContent);
      res.json(data);
    } catch (parseError) {
      res.status(500).json({
        message: `${fileName} contains invalid JSON.`
      });
    }
  });
}

function readJsonData(fileName, callback) {
  const filePath = path.join(__dirname, 'data', fileName);

  fs.readFile(filePath, 'utf8', (error, fileContent) => {
    if (error) {
      callback(error);
      return;
    }

    try {
      const data = JSON.parse(fileContent);
      callback(null, data, filePath);
    } catch (parseError) {
      callback(parseError);
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'OSBT Student Success Hub API is running.'
  });
});

app.get('/api/events', (req, res) => {
  readJsonFile('events.json', res);
});

app.post('/api/events', (req, res) => {
  const title = (req.body.title || '').trim();
  const date = (req.body.date || '').trim();
  const category = (req.body.category || '').trim();
  const description = (req.body.description || '').trim();
  const errors = {};

  if (!title) {
    errors.title = 'Title is required';
  }

  if (!date) {
    errors.date = 'Date is required';
  }

  if (!category) {
    errors.category = 'Category is required';
  }

  if (!description) {
    errors.description = 'Description is required';
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      success: false,
      errors
    });
    return;
  }

  readJsonData('events.json', (readError, events, filePath) => {
    if (readError) {
      res.status(500).json({
        success: false,
        message: 'Could not read events data.'
      });
      return;
    }

    const nextId = events.length > 0
      ? Math.max(...events.map((eventItem) => eventItem.id || 0)) + 1
      : 1;

    const createdEvent = {
      id: nextId,
      title,
      date,
      category,
      description,
      createdAt: new Date().toISOString()
    };

    events.push(createdEvent);

    fs.writeFile(filePath, JSON.stringify(events, null, 2), (writeError) => {
      if (writeError) {
        res.status(500).json({
          success: false,
          message: 'Could not save event.'
        });
        return;
      }

      res.status(201).json({
        success: true,
        event: createdEvent
      });
    });
  });
});

app.delete('/api/events/:id', (req, res) => {
  const eventId = Number(req.params.id);

  readJsonData('events.json', (readError, events, filePath) => {
    if (readError) {
      res.status(500).json({
        success: false,
        message: 'Could not read events data.'
      });
      return;
    }

    const eventExists = events.some((eventItem) => eventItem.id === eventId);

    if (!eventExists) {
      res.status(404).json({
        success: false,
        message: 'Event not found.'
      });
      return;
    }

    const updatedEvents = events.filter((eventItem) => eventItem.id !== eventId);

    fs.writeFile(filePath, JSON.stringify(updatedEvents, null, 2), (writeError) => {
      if (writeError) {
        res.status(500).json({
          success: false,
          message: 'Could not delete event.'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Event deleted successfully.'
      });
    });
  });
});

app.get('/api/requests', (req, res) => {
  readJsonFile('requests.json', res);
});

app.post('/api/requests', (req, res) => {
  const fullName = (req.body.fullName || '').trim();
  const email = (req.body.email || '').trim();
  const studentType = (req.body.studentType || '').trim();
  const category = (req.body.category || '').trim();
  const message = (req.body.message || '').trim();
  const errors = {};

  if (!fullName) {
    errors.fullName = 'Full name is required';
  }

  if (!isValidEmail(email)) {
    errors.email = 'Valid email is required';
  }

  if (!studentType) {
    errors.studentType = 'Student type is required';
  }

  if (!category) {
    errors.category = 'Category is required';
  }

  if (!message) {
    errors.message = 'Message is required';
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      success: false,
      errors
    });
    return;
  }

  readJsonData('requests.json', (readError, requests, filePath) => {
    if (readError) {
      res.status(500).json({
        success: false,
        message: 'Could not read requests data.'
      });
      return;
    }

    const nextId = requests.length > 0
      ? Math.max(...requests.map((request) => request.id || 0)) + 1
      : 1;

    const createdRequest = {
      id: nextId,
      fullName,
      email,
      studentType,
      category,
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    requests.push(createdRequest);

    fs.writeFile(filePath, JSON.stringify(requests, null, 2), (writeError) => {
      if (writeError) {
        res.status(500).json({
          success: false,
          message: 'Could not save request.'
        });
        return;
      }

      res.status(201).json({
        success: true,
        request: createdRequest
      });
    });
  });
});

app.patch('/api/requests/:id/status', (req, res) => {
  const requestId = Number(req.params.id);
  const status = (req.body.status || '').trim().toLowerCase();
  const allowedStatuses = ['pending', 'done'];

  if (!allowedStatuses.includes(status)) {
    res.status(400).json({
      success: false,
      message: 'Status must be pending or done.'
    });
    return;
  }

  readJsonData('requests.json', (readError, requests, filePath) => {
    if (readError) {
      res.status(500).json({
        success: false,
        message: 'Could not read requests data.'
      });
      return;
    }

    const request = requests.find((item) => item.id === requestId);

    if (!request) {
      res.status(404).json({
        success: false,
        message: 'Request not found.'
      });
      return;
    }

    request.status = status;

    fs.writeFile(filePath, JSON.stringify(requests, null, 2), (writeError) => {
      if (writeError) {
        res.status(500).json({
          success: false,
          message: 'Could not update request status.'
        });
        return;
      }

      res.json({
        success: true,
        request
      });
    });
  });
});

app.get('/api/faqs', (req, res) => {
  readJsonFile('faqs.json', res);
});

app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
