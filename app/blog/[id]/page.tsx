'use client'
import { usePathname } from "next/navigation"

function PostPage({params}: {params: { id : string}}) {
 const pathname = usePathname()
    return (
    <>
    <h2 className="text-lg">PostPage</h2>
    <div>
        post ID : {params.id}
    </div>
    </>
)
}
export default PostPage