const NoData = ({ message = "No data found." }) => (
  <div className="flex flex-1 items-center justify-center py-10 text-gray-500 dark:text-gray-400">
    {message}
  </div>
);

export default NoData;
