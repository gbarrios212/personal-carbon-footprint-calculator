const app = require('./server/server');

const PORT = 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
