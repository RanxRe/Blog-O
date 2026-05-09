import { Link } from "react-router"
import { useSidebar } from "@/components/ui/sidebar"

const SidebarLink = ({ to, children, className }) => {
    const { setOpenMobile } = useSidebar()

    return (
        <Link
            to={to}
            className={className}
            onClick={() => setOpenMobile(false)}
        >
            {children}
        </Link>
    )
}

export default SidebarLink