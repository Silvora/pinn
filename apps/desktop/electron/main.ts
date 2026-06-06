import { app, BrowserWindow, shell } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getRendererEntryUrl() {
  return process.env.VITE_DEV_SERVER_URL;
}

function shouldOpenDevTools() {
  return process.env.ELECTRON_OPEN_DEVTOOLS === '1';
}

function getRendererEntryFile() {
  return path.resolve(__dirname, '../../dist/index.html');
}

function getPreloadEntry() {
  return path.resolve(__dirname, '../preload/preload.mjs');
}

async function createMainWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 1080,
    minHeight: 720,
    title: 'Pinn Desktop',
    backgroundColor: '#f5f7fb',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: getPreloadEntry(),
    },
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url);
    return { action: 'deny' };
  });

  const devServerUrl = getRendererEntryUrl();
  if (devServerUrl) {
    await window.loadURL(devServerUrl);
    if (shouldOpenDevTools()) {
      window.webContents.openDevTools({ mode: 'detach' });
    }
    return;
  }

  await window.loadFile(getRendererEntryFile());
}

app.whenReady().then(async () => {
  await createMainWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
