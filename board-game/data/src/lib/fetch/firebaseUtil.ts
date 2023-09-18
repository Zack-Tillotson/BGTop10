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

export async function query(collection: string, query?: [string, WhereFilterOp, string|number|string[]|number[]]) {
  const db = getDbRef()
  const collectionRef = db.collection(collection)
  if(query) {
    return collectionRef.where(...query).get()
  } else {
    return collectionRef.orderBy('priority', 'desc').get()
  }
}