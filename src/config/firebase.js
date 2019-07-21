// import Firebase from '@firebase/app';
import Firebase from 'firebase';
import 'firebase/firestore';

// Jambo Firebase (CloudFirestore) Config
export const config = {
  apiKey: 'AIzaSyCo0_krBnR4zz8LWwHyL3AlvAqbX8h02VY',
  authDomain: 'jambo-tech-4fd1e.firebaseapp.com',
  databaseURL: 'https://jambo-tech-4fd1e.firebaseio.com',
  projectId: 'jambo-tech-4fd1e',
  storageBucket: 'jambo-tech-4fd1e.appspot.com',
  messagingSenderId: '862748090723',
  appId: '1:862748090723:web:2d4a210f58d25f26',
};

// Personal Firebase (RealtimeDatabase) Config
// rnFirebase Config
// export const config = {
//   apiKey: 'AIzaSyD_lJE_sFDpSJY5rssO90mwc5WyuF5RNAs',
//   authDomain: 'rnfirebase-17d4b.firebaseapp.com',
//   databaseURL: 'https://rnfirebase-17d4b.firebaseio.com',
//   projectId: 'rnfirebase-17d4b',
//   storageBucket: 'rnfirebase-17d4b.appspot.com',
//   messagingSenderId: '980996935983',
//   appId: '1:980996935983:web:cb5f32f981dff0cf',
// };

const app = Firebase.initializeApp(config);
// To CloudFirestore
export const db = app.firestore();
// To RealTimeDatabase
// export const db = app.database();
