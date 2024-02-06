import path from 'node:path'

const dirname = import.meta.dir

export const FOLDERS = {
  public: {
    images: path.resolve(dirname, '..', '..', '..', '..', 'public', 'images'),
  },
  tmp: {
    images: path.resolve(dirname, '..', '..', '..', '..', '.tmp', 'images'),
  },
}
