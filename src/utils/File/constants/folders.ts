import path from 'node:path'

const dirname = import.meta.dir

export const FOLDERS = {
  public: {
    images: path.resolve(dirname, '..', '..', '..', '..', 'public', 'images'),
    pages: {
      index: path.resolve(
        dirname,
        '..',
        '..',
        '..',
        '..',
        'public',
        'pages',
        'index.html',
      ),
    },
  },
  tmp: {
    images: path.resolve(dirname, '..', '..', '..', '..', '.tmp', 'images'),
  },
}
