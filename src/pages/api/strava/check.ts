import { getSession } from 'next-auth/react'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session || !session.user?.email) {
    return res
      .status(401)
      .json({ isStravaConnected: false, error: 'There is no session' })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      stravaAccessToken: true,
      stravaRefreshToken: true,
      stravaTokenExpiresAt: true
    }
  })

  if (!user?.stravaAccessToken) {
    return res.json({ isStravaConnected: false })
  }

  try {
    if (
      user.stravaTokenExpiresAt &&
      new Date() > new Date(user.stravaTokenExpiresAt)
    ) {
      const refreshResponse = await axios.post(
        'https://www.strava.com/oauth/token',
        {
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: user.stravaRefreshToken
        }
      )

      const newToken = refreshResponse.data

      await prisma.user.update({
        where: { email: session.user.email },
        data: {
          stravaAccessToken: newToken.access_token,
          stravaRefreshToken: newToken.refresh_token,
          stravaTokenExpiresAt: new Date(
            Date.now() + newToken.expires_in * 1000
          )
        }
      })

      return res.json({ isStravaConnected: true })
    }

    await axios.get('https://www.strava.com/api/v3/athlete', {
      headers: { Authorization: `Bearer ${user.stravaAccessToken}` }
    })

    return res.json({ isStravaConnected: true })
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).response?.status === 401) {
      await prisma.user.update({
        where: { email: session.user.email },
        data: {
          stravaAccessToken: null,
          stravaRefreshToken: null,
          stravaTokenExpiresAt: null
        }
      })

      return res.json({ isStravaConnected: false })
    }

    return res.status(500).json({
      error: 'Failed to authenticate with Strava',
      isStravaConnected: false
    })
  }
}
