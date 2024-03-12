import { Panda } from '@core-types/Panda'

type PandasProps = {
  pandas: Panda[]
}

export function Pandas({ pandas }: PandasProps) {
  return (
    <ul class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-[64rem] mx-auto mt-12'>
      {pandas.map((panda) => (
        <li class='rounded-md p-4 bg-neutral-800'>
          <img
            src={panda.image}
            alt={String(panda.statusCode)}
            loading='eager'
            width={300}
            height={350}
            style={{ objectFit: 'cover' }}
            class='w-full'
          />
          <div class='w-full flex flex-col gap-1 mt-2'>
            <strong class='block w-max mx-auto text-2xl text-blue-500'>
              {panda.statusCode}
            </strong>
            <p class='block text-neutral-300 text-lg w-max mx-auto'>
              {panda.statusMessage}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
