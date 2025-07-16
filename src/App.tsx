import './App.css'
import BaseForm from './components/BaseForm'
import ParticlesBackground from './components/ParticlesBackground';


function App() {
  return (
    <>
      <div className="relative min-h-screen text-white overflow-hidden">
        <ParticlesBackground />
        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <BaseForm />
        </div>
      </div>
    </>
  );
};

export default App;
