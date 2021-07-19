import React, { useEffect, useState } from 'react'
import { ZoomMtg } from '@zoomus/websdk'
import crypto from 'crypto'

const Zoom = () => {
  const apiKey = process.env.REACT_APP_ZOOM_API_KEY
  const apiSecret = process.env.REACT_APP_ZOOM_SECRET
  const leaveUrl = process.env.REACT_APP_SITE_URL
  const userName = 'Eve from ReChord'
  const userEmail = 'eve@rechord.ai'

  const [meetingNumber, setMeetingNumber] = useState(null)
  const [passWord, setPassWord] = useState('')
  const [signature, setSignature] = useState('')

  useEffect(() => {
    showZoomDiv()
    setMeetingParams()
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.5/lib', '/av')
    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareWebSDK()
  }, [])

  useEffect(() => {
    if (meetingNumber) generateSignature(apiKey, apiSecret, meetingNumber, 0).then(response => setSignature(response))
  }, [meetingNumber])

  useEffect(() => {
    if (meetingNumber && passWord && signature) {
      initiateMeeting()
    }
  }, [meetingNumber, passWord, signature])

  function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    return new Promise((resolve, reject) => {
      const timestamp = new Date().getTime() - 30000
      const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
      const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
      const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
      resolve(signature)
    })
  }

  const showZoomDiv = () => {
    document.getElementById('zmmtg-root').style.display = 'block'
  }

  const setMeetingParams = () => {
    const queryParams = new URLSearchParams(window.location.search)
    var meetingNo = queryParams.get('meetingNumber')
    var pw = queryParams.get('password')
    console.log(meetingNo)
    console.log(pw)
    setMeetingNumber(meetingNo)
    setPassWord(pw)
  }

  const initiateMeeting = () => {
    console.log(meetingNumber, passWord, signature, leaveUrl)
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: success => {
        console.log(success)
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: success => {
            console.log(success)
          },
          error: error => {
            console.log(error)
          },
        })
      },
      error: error => {
        console.log(error)
      },
    })
  }
  return <div></div>
}

export default Zoom
