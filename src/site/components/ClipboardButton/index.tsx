export function ClipboardButton() {
  return (
    <div class='inline-flex items-center gap-x-3'>
      <span
        id='hs-clipboard-basic'
        class='sr-only text-sm font-medium text-gray-100 dark:text-white'
      >
        https://http.pandas/
      </span>

      <button
        type='button'
        class='js-clipboard p-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
        data-clipboard-target='#hs-clipboard-basic'
        data-clipboard-action='copy'
        data-clipboard-success-text='Copied'
      >
        <svg
          class='js-clipboard-default size-4 group-hover:rotate-6 transition'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <rect width='8' height='4' x='8' y='2' rx='1' ry='1' />
          <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
        </svg>

        <svg
          class='js-clipboard-success hidden size-4 text-blue-600'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <polyline points='20 6 9 17 4 12' />
        </svg>
      </button>
    </div>
  )
}
