require('dotenv').config()
const util = require('util')
const exec = util.promisify(require('child_process').exec)

/**
 * Get environment variable with fallback for both Next.js and Vite
 * Next.js uses NEXT_PUBLIC_ prefix
 * Vite uses VITE_ prefix
 */
const getEnvVar = (name) => {
    // Try Next.js format first
    if (process.env[`NEXT_PUBLIC_${name}`]) {
        return process.env[`NEXT_PUBLIC_${name}`]
    }
    // Try Vite format
    if (process.env[`VITE_${name}`]) {
        return process.env[`VITE_${name}`]
    }
    // Try without prefix
    return process.env[name]
}

const apiUrl = getEnvVar('TOLGEE_API_URL')
const apiKey = getEnvVar('TOLGEE_API_KEY')
const staticData = getEnvVar('TOLGEE_STATIC_DATA') || './public/i18n'

/**
 * Check if Tolgee CLI is installed
 */
const checkTolgeeCLI = async () => {
    try {
        await exec('tolgee --version')
        return true
    } catch (e) {
        return false
    }
}

const pullTranslations = async () => {
        const args = process.argv.slice(2)
        const options = {}

        // Parse command line arguments
        args.forEach(arg => {
            if (arg.startsWith('--')) {
                const [key, value] = arg.split('=')
                options[key.replace('--', '')] = value
            }
        })

        // Use command line options or environment variables
        const finalApiUrl = options['apiUrl'] ?? apiUrl
        const finalApiKey = options['apiKey'] ?? apiKey
        const finalPath = options['path'] ?? staticData

        // Validate required parameters
        if (!finalApiUrl) {
            console.error('Error: API URL is required. Set NEXT_PUBLIC_TOLGEE_API_URL, VITE_TOLGEE_API_URL, or pass --apiUrl=<url>')
            process.exit(1)
        }

        if (!finalApiKey) {
            console.error('Error: API Key is required. Set NEXT_PUBLIC_TOLGEE_API_KEY, VITE_TOLGEE_API_KEY, or pass --apiKey=<key>')
            process.exit(1)
        }

        // Check if Tolgee CLI is installed
        const isInstalled = await checkTolgeeCLI()
        if (!isInstalled) {
            console.error('❌ Tolgee CLI is not installed!')
            console.error('\nPlease install it using one of these methods:')
            console.error('\n1. NPM (recommended):')
            console.error('   npm install -D @tolgee/cli')
            console.error('\n2. Global installation:')
            console.error('   npm install -g @tolgee/cli')
            console.error('\n3. Using npx (no installation needed):')
            console.error('   npx @tolgee/cli pull --api-url=<url> --api-key=<key> --path=<path>')
            console.error('\nThen run this script again.')
            process.exit(1)
        }

        console.log('Pulling translations from Tolgee...')
        console.log(`API URL: ${finalApiUrl}`)
        console.log(`Output path: ${finalPath}`)

        try {
            const { stdout, stderr } = await exec(
                `tolgee pull --api-url=${finalApiUrl} --api-key=${finalApiKey} --path=${finalPath} --verbose`
            )

            if (stdout) {
                console.log(stdout)
            }

            if (stderr) {
                console.error('Warnings/Errors:', stderr)
            }

            console.log('✓ Translations pulled successfully!')
        } catch (e) {
            console.error('Failed to pull translations:')
            console.error(e.message)
            if (e.stderr) {
                console.error(e.stderr)
            }
            process.exit(1)
        }
    }

;(async () => {
    await pullTranslations()
})()