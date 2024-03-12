import { ClipboardButton } from '@ui/components/ClipboardButton'
import { PandasSkeleton } from '@ui/components/PandasSkeleton'

export function Home() {
  return (
    <main class='bg-neutral-900 h-auto px-6 lg:px-0 pb-24'>
      <header class='flex items-center justify-end h-16'>
        <a href='/' target='_blank' rel='noreferrer'>
          <img src='https://usehooks.com/img/icon-github.svg' alt='' />
        </a>
      </header>
      <h1 class='text-center text-4xl text-neutral-300 italic'>
        HTTP
        <span class='ml-2 text-pink-400 text-5xl font-extrabold'>Pandas</span>
      </h1>
      <p class='text-neutral-300 text-center mt-12 text-2xl'>
        Cute Pandas for Each HTTP Response Status Code.
      </p>

      <div class='flex itens-center justify-between mx-auto rounded-md bg-neutral-800 w-full max-w-[40rem] mt-8 p-4 text-lg'>
        <span class='block py-2 text-neutral-300 text-sm sm:text-base'>
          https://http.pandas/[status_code]
        </span>
        <ClipboardButton />
      </div>

      <PandasSkeleton />
    </main>
  )
}
