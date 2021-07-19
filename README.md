# Zoom-SDK integration with React

- Project initialized with create-react-app

## Parameters required

- URL Query parameters for Zoom Meeting number as 'meetingNumber' and password for joining as 'password'

## Environment Variables

1. REACT_APP_ZOOM_API_KEY
2. REACT_APP_ZOOM_SECRET
3. REACT_APP_SITE_URL=http://localhost:3000

- Get 1 & 2 from https://marketplace.zoom.us/user/build by creating a JWT App
- 3 will change to web url in production

## Packages used

- @zoomus/websdk
- crypto

## Reference

- https://marketplace.zoom.us/docs/sdk/native-sdks/web
- https://github.com/zoom/websdk
