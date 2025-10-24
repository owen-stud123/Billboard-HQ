import Footer from '../Components/Footer'; 

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Billboard HQ</h1>
      <p className="text-lg text-gray-700">
       Bold Ideas, Bold Locations.
      </p>

      
      <Footer />
    </div>
  );
}

export default Home;
