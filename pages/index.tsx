
import AirdropForm from '../components/AirdropForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-black bg-cover bg-center flex items-center justify-center"
         style={{ backgroundImage: "url('/bg.jpg')" }}>
      <AirdropForm />
    </div>
  );
}
