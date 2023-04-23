import { useState } from "react"
import Loader from "./Loader"
import { STATE_CHANGED, auth, storage } from "../lib/firebase"



export default function ImageUploard()
{
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [downloadURL, setDownloadURL] = useState(null)

    const UploadFile = async (e) => {
        const file = Array.from(e.target.files)[0]
        const extension = file.type.split('/')[1]
        
        const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`)
        setUploading(true)

        const task = ref.put(file)

        task.on(STATE_CHANGED, (snapshot) => {
            const pct = (( snapshot.bytesTransferred / snapshot.totalBytes ) * 100 ).toFixed(0)
            setProgress(pct)
            
            task
                .then((d) => ref.getDownloadURL())
                .then((url) => {
                    setDownloadURL(url)
                    setUploading(false)
                })
        })

    }



    return (
        <div className="box" >
            <Loader show={uploading} />
            {uploading && <h3>{progress}%</h3>}

            {!uploading && (
                <>
                    <label className="btn" >
                        Upload Img
                        <input type="file" onChange={UploadFile} accept="image/x-png, image/gif, image/jpeg" />
                    </label>
                </>
            )}

            { downloadURL && <code className="upload-snippet" > {`![alt](${downloadURL})`} </code> }
        </div>
    )
}