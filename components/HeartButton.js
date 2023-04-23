import { useDocument } from "react-firebase-hooks/firestore"
import { auth, firestore } from "../lib/firebase"
import { increment } from "firebase/firestore"

export default function Heart({  postRef }){

    const heartRef = postRef.collection('heart').doc(auth.currentUser.uid)
    const [heartDoc] = useDocument(heartRef)

    const addHeart = async () => {
        const uid = auth.currentUser.uid
        const batch = firestore.batch()

        batch.update( postRef, { heartCount: increment(1) } )
        batch.set(heartRef, { uid })

        await batch.commit()
    }

    const removeHeart = async () => {
        const uid = auth.currentUser.uid
        const batch = firestore.batch()

        batch.update( postRef, { heartCount: increment(-1) } )
        batch.delete(heartRef, { uid })

        await batch.commit()
    }

    return (
        <>
           { heartDoc?.exists ? 
               <button onClick={removeHeart} > Unheart </button>
               :
               <button onClick={addHeart} > Heart </button>
           }
        </>
    )
}