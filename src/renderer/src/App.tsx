import Versions from './components/Versions'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div>
      <button onClick={() => ipcHandle()}>Ping</button>
      <Versions></Versions>
    </div>
  )
}

export default App
