import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { getSession } from 'next-auth/react'

import { prisma } from '@/lib/prisma'

const STRAVA_CLIENT_ID = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID!
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET!

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { code } = req.query

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' })
  }

  try {
    const response = await axios.post(
      'https://www.strava.com/oauth/token',
      null,
      {
        params: {
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code'
        }
      }
    )

    const { access_token, refresh_token, athlete, expires_in } = response.data

    const session = await getSession({ req })

    if (!session || !session.user?.email) {
      return res.status(401).json({ error: 'There is no session' })
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        stravaId: athlete.id.toString(),
        stravaAccessToken: access_token,
        stravaRefreshToken: refresh_token,
        stravaTokenExpiresAt: new Date(Date.now() + expires_in * 1000)
      }
    })

    res.redirect('/strava')
  } catch (error) {
    console.error(
      'Strava Auth Error:',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error as any).response?.data || (error as any).message
    )
    res.status(500).json({ error: 'Failed to authenticate with Strava' })
  }
}
