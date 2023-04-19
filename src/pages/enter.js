import { useContext, useState } from "react"
import { auth, googleAuthProvider } from "../../lib/firebase"
import { UserContext } from "../../components/context"


export default function EnterPage({  })
{
    const { user, username } = useContext(UserContext)

    return (
        <main>
            {
                user ?
                    !username ? <UsernameForm/> : <SignOutButton/>
                    :
                    <SignInButton/>
            }
        </main>
    )
}



function SignInButton()
{
    const signInWithGoogle = async () => 
    {
        await auth.signInWithPopup(googleAuthProvider)
    }

    return (
        <button className="btn-google" onClick={signInWithGoogle} >
            <img src={'/vercel.svg'} /> Sign in with Google
        </button>
    )
}

function SignOutButton()
{
    return (
        <button onClick={() => auth.signOut()} > 
            Sign Out
        </button> 
    )
}

function UsernameForm()
{
    const [ formValue, setFormValue ] = useState('')
    const [ isValid, setIsValid ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const { user,username } = useContext(UserContext)

    return <>
        !username && (
            <section>
                <h3> Choose Username </h3>
                <form onSubmit={onSubmit}>

                    <input name="username" placeholder="username" value={formValue} onChange={onChange} />
                    <button type="submit" className="btn-green" disabled={!isValid} >
                        Choose
                    </button>

                    <h3> Debug State </h3>
                    <div>
                        Username : {formValue}
                        <br/>
                        Loading : {loading.toString()}
                        <br/>
                        Username Valid: {isValid.toString()}
                    </div>

                </form>
            </section>
        )
    </>
}