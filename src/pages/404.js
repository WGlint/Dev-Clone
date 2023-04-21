import Link from "next/link"

export default function Custum404(){
    return (
        <main>
            <h1> Erreur 404 ... Calm down, no fucking fighting ! 😱 </h1>
            <iframe
                src="https://giphy.com/embed/d3HeU0IDO2jLy"
                width="480"
                height="362"
                frameBorder="0"
                allowFullScreen
            >
            </iframe>
            <Link href="/" >
                <button className="btn-blue" > Go back  </button>
            </Link>
        </main>
    )
}
