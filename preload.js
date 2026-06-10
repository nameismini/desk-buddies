const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  openPanel: (which) => ipcRenderer.invoke('open-panel', which),
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: (cfg) => ipcRenderer.invoke('save-config', cfg),
  quitApp: () => ipcRenderer.invoke('quit-app'),
  launchTrading: () => ipcRenderer.invoke('launch-trading'),
  getNews: () => ipcRenderer.invoke('get-news'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  notify: (payload) => ipcRenderer.invoke('notify', payload),
  getIdle: () => ipcRenderer.invoke('get-idle'),
  chat: (payload) => ipcRenderer.invoke('chat', payload)
});
