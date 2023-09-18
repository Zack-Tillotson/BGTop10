import { initializeApp, applicationDefault, getApps, App } from 'firebase-admin/app'
import { Firestore, getFirestore, WhereFilterOp } from 'firebase-admin/firestore'

let db : Firestore | null = null

function getDbRef() {
  const app = getApps().length ? (getApps()[0]) : initializeApp({
    credential: applicationDefault(),
  })

  db = getFirestore(app)
  return db
}

export async function query(collection: string, query: [string, WhereFilterOp, string|number|string[]|number[]]) {
  const db = getDbRef()
  return db.collection(collection).where(...query).get()
}