export function PandasSkeleton() {
  return (
    <ul
      hx-get='/ui/pandas'
      hx-trigger='load'
      hx-swap='outerHTML'
      class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-[64rem] mx-auto mt-12'
    >
      {Array.from({ length: 9 }).map(() => (
        <li class='rounded-md p-4 pb-24 bg-neutral-800'>
          <div class='animate-pulse h-72 bg-neutral-600 rounded-mdbg-gray-200' />
        </li>
      ))}
    </ul>
  )
}
