import Navbar from './Navbar';
import Sidebar from './Sidebar';

const App = () => {

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '20px' }}>
          <h1>MCA Students</h1>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            <div className="card" style={{ backgroundColor: 'orange', padding: '20px', borderRadius: '10px', width: '300px', color: 'white' }}>
              <h2>Tushar</h2>
              <p><strong>EDU:</strong> MCA student</p>
              <p><strong>City:</strong> Pune</p>
              <p><strong>Demean:</strong> DevOps Engineer</p>
              <p><strong>Projects:</strong> Vote System</p>
            </div>
            <div className="card" style={{ backgroundColor: 'blue', padding: '20px', borderRadius: '10px', width: '300px', color: 'white' }}>
              <h2>Shantunu</h2>
              <p><strong>EDU:</strong> MCA student</p>
              <p><strong>City:</strong> Pune</p>
              <p><strong>Demean:</strong> DevOps Engineer</p>
              <p><strong>Projects:</strong> Vote System</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
export default App