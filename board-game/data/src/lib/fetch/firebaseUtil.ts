import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore, WhereFilterOp } from 'firebase-admin/firestore'

const APP = initializeApp({
  credential: applicationDefault(),
});

const FIRESTORE = getFirestore(APP)

function getDbRef() {
  return FIRESTORE
}

export async function query(collection: string, query: [string, WhereFilterOp, string|number|string[]|number[]]) {
  const db = getDbRef()
  return db.collection(collection).where(...query).get()
}