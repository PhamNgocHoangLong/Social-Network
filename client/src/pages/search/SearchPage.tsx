

export const SearchPage = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-t-3xl border shadow-lg min-h-screen">
      <div className="flex flex-col justify-center">
        <div className="p-6 rounded-lg">
          <div className="relative">
            <button
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.65 12A6.65 6.65 0 1 1 12 5.35a6.65 6.65 0 0 1 4.65 6.65z"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="bg-gray-100 w-full px-4 py-2 pr-12 border rounded-2xl focus:outline-none"
            />
          </div>
        </div>
        <div className="ml-6 opacity-30">
          <b>Gợi ý theo dõi</b>
        </div>
        <div className="flex gap-5 pl-5 pt-6">
                <img src="" className="mt-2" />
                <div className=" flex flex-col flex-1 border-b pb-2 pr-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">long</div>
                      <div className="opacity-50 font-normal">
                        long pham
                      </div>
                    </div>
                    <button
                    className="font-semibold border px-4 py-1 rounded-xl border-gray-500"
                  >
                    Theo dõi
                  </button>
                  </div>
                  <div className="mt-2">
                    1t người theo dõi
                  </div>
                </div>
              </div>
      </div>
    </div>
  );
};