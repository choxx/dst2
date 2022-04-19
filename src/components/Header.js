import GoH from '../images/GoH-Transparent.png';
import haryanaLogo from '../images/SDIT-Haryana.png';

export default function Header() {
  return (
    <>
      <div className="bg-teal-700 text-3xl text-white text-center p-4">
      </div>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="sr-only">Workflow</span>
              <img className="h-8 w-auto sm:h-10"
                   src={haryanaLogo}
                   alt=""/>
            </div>
            <img className="h-14 w-auto sm:h-14"
                 src={GoH}
                 alt=""/>
          </div>
        </div>
      </div>
    </>
  )
}
