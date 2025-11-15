import admin from 'firebase-admin';
import serviceAccount from '../../fcmServiceAccountKey.json';
import { ServiceAccount } from 'firebase-admin';


admin.initializeApp({
 credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
