const PROJECT_PREFIX = 'HPWSAS'

const Constants = {
  AUID: `${PROJECT_PREFIX}`,
  HPWSAS_REFRESH_TOKEN: `${PROJECT_PREFIX}_REFRESH_TOKEN`,
  BROADCAST_CHANNEL_NAME: `${PROJECT_PREFIX}_BROADCAST_CHANNEL`,
  BroadcastType: {
    LOGOUT: 'logout',
    REFRESH_TOKEN: 'refresh_token'
  },
  PageRoutes: {
    INDEX: '/',
    LOGIN: '/login',
    HOME: '/home',
    ERROR: '/error'
  }
}

export default Constants