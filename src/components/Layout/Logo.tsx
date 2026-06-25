export default function Logo() {
  return (
    <div className="h-16 p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white text-sm lg:text-md">Ecom Store</span>
        </div>
    </div>
);
}