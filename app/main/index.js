import { app, ipcMain, dialog, crashReporter } from 'electron';
import sql from 'sql.js';
process.on('uncaughtException', (error) => {
  console.log('Error caught');
});

const start = () => {
  console.log('Electron is running');
  console.log(undefinedVarToThrow);
}

crashReporter.start({
  companyName: 'Stemn',
  productName: 'Stemn Desktop',
  submitURL: 'http://localhost:1127',
  autoSubmit: true,
  extra: {
    app_version: '1.1'
  }
})

app.on('ready', start);