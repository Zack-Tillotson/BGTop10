import { Firestore, getFirestore, OrderByDirection, WhereFilterOp } from 'firebase-admin/firestore'
import { getApp } from './app'

let db : Firestore | null = null

function getDbRef() {
  const app = getApp()

  db = getFirestore(app)
  return db
}

type QueryOptionsQuery = [string, WhereFilterOp, string|number|string[]|number[]]

export type QueryOptions = {
  query?: QueryOptionsQuery|null,
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

export async function get(
  collection: string,
  id: string,
) {

  const db = getDbRef()
  
  const collectionRef = db.collection(collection)
  return collectionRef.doc(id).get()
}

export async function save(collection: string, doc: object, id?: string) {
  const db = getDbRef()
  const collectionRef = db.collection(collection)

  if(id) {
    return collectionRef.doc(id).set(doc)
  }

  return collectionRef.add(doc)
}

export async function setAttribute(collection: string, idOrWhere: string|QueryOptionsQuery, key: string, value: any) {
  const db = getDbRef()
  const collectionRef = db.collection(collection)

  if(typeof idOrWhere === 'string') {
    collectionRef.doc(idOrWhere).set({[key]: value}, {merge: true})
    return true
  }

  const [whereAttr, whereOp, whereValue] = idOrWhere
  const result = await collectionRef.where(whereAttr, whereOp, whereValue).limit(25).get()
  const results = await Promise.all(result.docs.map(doc => collectionRef.doc(doc.id).set(({[key]: value}))))
  return !results.find(eachResult => !eachResult)
}