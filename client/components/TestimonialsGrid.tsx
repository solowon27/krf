'use client';

const testimonials = [
  {
    name: 'Mr. Abiel Bisetegn',
    role: 'Teacher',
    video: '/videos/Abiel.mp4',    
  },
  {
    name: 'Ato Habtemariam Libase',
    role: 'Director',
    video: '/videos/Habtemariam.mp4',    
  },
  {
    name: 'Handover books infront of Students',
    video: '/videos/Handover.mp4'
  }
];

export default function TestimonialsGrid() {
  return (
    <section className="bg-white-500 py-5 px-0 text-center w-full mb-10">
      <h3 className="text-3xl text-black font-bold mb-5">Testimonials</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1600px] mx-auto px-2">
        {testimonials.map(({ name, video }) => (
          <div key={name} className="border border-gray-300 bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
            <video
              controls
              className="rounded-lg w-full h-64 object-cover mb-4"
              preload="metadata"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-black-600 font-semibold">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
