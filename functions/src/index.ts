import * as functions from 'firebase-functions';
import expressApplication from './app'

export const app = functions.https.onRequest(expressApplication)
