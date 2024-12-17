import React from 'react';

const Home = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage: 'url("https://www.codester.com/static/uploads/items/000/024/24284/preview/001.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-75"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-6xl font-extrabold mb-6 animate__animated animate__fadeIn tracking-wide">
          Welcome to <span className="text-yellow-400">PetShop JMB</span>
        </h1>
        <p className="text-lg max-w-3xl text-center mb-8 animate__animated animate__fadeIn animate__delay-1s leading-relaxed">
        "Petshop JMB hadir sebagai solusi lengkap untuk memenuhi kebutuhan hewan kesayangan Anda, mulai dari makanan, aksesori, hingga layanan grooming dan kesehatan, semua dengan kualitas terbaik!".
        </p>
        <p className="text-md max-w-2xl text-center mb-8 animate__animated animate__fadeIn animate__delay-2s italic">
          "Because every pet deserves the best."
        </p>
        <div className="flex gap-4 animate__animated animate__fadeIn animate__delay-3s">
          {/* <button className="px-6 py-3 bg-white text-black font-bold rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
            Contact Us
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
