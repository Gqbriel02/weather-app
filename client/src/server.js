const http = require('http');
const { exec } = require('child_process');

// Run the Angular build command
exec('ng build --prod', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error during build: ${error}`);
    return;
  }
  console.log(`Build successful:\n${stdout}`);
  console.error(`Build errors:\n${stderr}`);

  // Start an HTTP server using http-server
  const server = http.createServer((req, res) => {
    // Modify this path to match your Angular app's built output directory
    const path = 'dist/client' + req.url;
    res.end(`Serving: ${path}`);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
