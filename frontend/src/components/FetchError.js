const FetchError = () => {
  return (
    <main className="transition duration-1000 bg-gray-100 dark:bg-gray-900 flex-grow flex items-center justify-center">
      <h1 className="text-center text-3xl text-gray-900 dark:text-gray-100">
        We could't fetch the cities. Please try again later.
      </h1>
    </main>
  );
};

export default FetchError;
