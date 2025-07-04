export default function SkeletonCard({ reverse = false }) {
  return (
    <div className="flex flex-col md:flex-row items-center bg-dark-200 p-6 rounded-xl shadow-lg w-full">
      <div className={`md:w-1/2 w-full animate-pulse ${reverse ? 'md:order-2' : ''}`}>
        <div className="h-8 bg-dark-300 rounded w-3/4 mb-4"></div>
        <div className="h-5 bg-dark-300 rounded w-full mb-5"></div>
        <div className="h-20 bg-dark-300 rounded w-full mb-6"></div>
        <div className="h-6 bg-dark-300 rounded w-1/3"></div>
      </div>
      <div className={`md:w-1/2 w-full mt-8 md:mt-0 flex justify-center ${reverse ? 'md:order-1' : ''}`}>
        <div className="w-full h-64 bg-dark-300 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}