import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('pinnDesktop', {
  platform: 'electron',
  versions: {
    chrome: process.versions.chrome,
    electron: process.versions.electron,
    node: process.versions.node,
  },
});
