import { initializeApp, applicationDefault, App, getApps } from 'firebase-admin/app'

export function getApp() {
  return getApps().length ? (getApps()[0]) : initializeApp({
    credential: applicationDefault(),
    storageBucket: 'bgtop10-2.appspot.com',
  })
}