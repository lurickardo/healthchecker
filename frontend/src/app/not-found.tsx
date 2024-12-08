export default function Page404() {
  return (
    <main className="grid  place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-9xl font-semibold text-hc-green-300">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-hc-white-200 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-2xl leading-7 text-hc-white-200">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="text-hc-black-200 bg-hc-green-300 hover:bg-hc-green-500 border-2 border-hc-black-300 focus:ring-4 focus:outline-none focus:hc-black-300 font-medium rounded text-base px-4 py-2 text-center"
          >
            Go back
          </a>
        </div>
      </div>
    </main>
  );
}
