export default function Upload() {
  return (
    <div className="flex flex-col gap-28 w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-300 items-center overflow-hidden">
      <div className="flex flex-col mt-10 h-40 w-5/6">
        <h1 className="text-3xl font-bold items-center mt-auto ml-auto mr-auto text-gray-600">
          Turn .PDF Files to .ISC Files
        </h1>
        <h3 className="text-xl text-gray-700 opacity-50 ml-auto mr-auto">
          or open with Google Calendar
        </h3>
        
      </div>
      <div className="items-center shadow-lg bg-gray-300 flex h-1/2 w-4/6 max-w-3/6 rounded-sm border border-opacity-75 border-4 border-gray-400 border-solid">
        <div className="m-auto">
          <button className="bg-blue-400 hover:bg-blue-500 shadow-md rounded-xl pt-8 pb-8 pl-16 pr-16">
            Upload PDF Files
          </button>
          <p className="text-center text-sm text-blue-900 opacity-50">
            or drop PDFs here
          </p>
        </div>
      </div>
    </div>
  )
}
