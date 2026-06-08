import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sendDonationEmail } from './server/sendDonationEmail.mjs'

function donationApiPlugin(env) {
  return {
    name: 'donation-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/send-donation' || req.method !== 'POST') {
          return next()
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', async () => {
          try {
            const payload = JSON.parse(body)
            const data = await sendDonationEmail(payload, { ...process.env, ...env })
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, id: data?.id }))
          } catch (err) {
            console.error('[donation-api]', err)
            res.statusCode = err.message?.includes('Missing') || err.message?.includes('required')
              ? 400
              : 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: err.message || 'Send failed' }))
          }
        })
        req.on('error', () => {
          res.statusCode = 500
          res.end(JSON.stringify({ ok: false, error: 'Request error' }))
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      donationApiPlugin(env),
    ],
  }
})
