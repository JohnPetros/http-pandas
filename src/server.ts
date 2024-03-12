import { app } from 'app'

const PORT = Number(process.env.PORT) ?? 3000

app.startServer(PORT, () => console.log(`Server is running on port: ${PORT}`))
