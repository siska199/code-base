import { cn } from "@lib/utils/helper"
import { VariantProps, cva } from "class-variance-authority"

interface TProps extends React.HTMLProps<HTMLDivElement>, VariantProps<typeof logoVariants> {

}

const Logo = (props: TProps) => {
    const { className, sizeLogo, ...attrs } = props
    return (
        <div className={cn(logoVariants({ className, sizeLogo, }))} {...attrs}>
            🌼Code199
        </div>
    )
}


const logoVariants = cva(
    'w-fiit inline flex gap-2 items-center font-bold text-primary-600',
    {
        variants: {
            variant: {
                'clickable': '',
                'none': ''
            },
            sizeLogo: {
                'small': '',
                'base': '',
                'large': ''
            }
        },

        defaultVariants: {
            variant: "none",
            sizeLogo: 'base'
        }
    }
)


export default Logo