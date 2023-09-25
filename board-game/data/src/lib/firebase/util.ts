import { initializeApp, applicationDefault, getApps, App } from 'firebase-admin/app'
import { Firestore, getFirestore, OrderByDirection, WhereFilterOp } from 'firebase-admin/firestore'

let db : Firestore | null = null

function getDbRef() {
  const app = getApps().length ? (getApps()[0]) : initializeApp({
    credential: applicationDefault(),
  })

  db = getFirestore(app)
  return db
}

export type QueryOptions = {
  query?: [string, WhereFilterOp, string|number|string[]|number[]]|null,
  orderBy?: [string, OrderByDirection]|null,
}

const DEFAULT_QUERY_OPTIONS = {
  query: null,
  orderBy: null,
}

export async function query(
  collection: string,
  options: QueryOptions = DEFAULT_QUERY_OPTIONS,
) {

  const {
    query,
    orderBy,
  } = options

  const db = getDbRef()
  
  const collectionRef = db.collection(collection)

  if(query) {
    let fbQuery = collectionRef.where(...query).limit(25)
    if(orderBy) {
      fbQuery = fbQuery.orderBy(...orderBy)
    }
    return fbQuery.get()
  } else if(orderBy) {
    return collectionRef.orderBy(...orderBy).limit(25).get()
  } else {
    return collectionRef.get()
  }
}

export async function save(collection: string, doc: object, id?: string) {
  const db = getDbRef()
  const collectionRef = db.collection(collection)

  if(id) {
    return collectionRef.doc(id).set(doc)
  }

  return collectionRef.add(doc)
}