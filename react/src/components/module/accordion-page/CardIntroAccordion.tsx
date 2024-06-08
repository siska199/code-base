import CardIntro from "@components/cards/CardIntro"
import Accordion from "@components/ui/Accordion"


const CardIntroAccordion = () => {
    return (
        <CardIntro
            title={'Accordion'}
            subTitle=" An accordion consists of multiple sections or panels, each containing a header and associated content. The headers are usually displayed in a vertical stack, and clicking on a header expands the associated content while collapsing the others."
            DisplayComponent={<DisplayAccordion />}
            displayCodeBase={displayCodeBase}
        />
    )
}

const DisplayAccordion = () => {
    const listOption = [
        {
            label: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            value: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio,`
        },
        {
            label: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            value: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio,`
        },
        {
            label: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            value: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio,`
        }
    ]
    return <Accordion options={listOption} />
}

const displayCodeBase = `/* eslint-disable react/jsx-handler-names */
import IconChevronToggle from "@assets/icons/IconChevronToggle"
import { TOption } from "@types"
import clsx from "clsx"
import { useState } from "react"

interface TProps {
  options: TOption[]
}

const Accordion = (props: TProps) => {
  const { options } = props
  return (
    <div className="flex flex-col gap-2">
      {
        options?.map((option, i) => (
          <Floating key={i} {...option} />
        ))
      }
    </div>
  )
}


const Floating = (props: TOption) => {
  const { label, value } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2 gap w-full border-b py-3">
      <div className="flex items-center w-full font-medium text-body-large justify-between">
        {label}
        <div className="cursor-pointer-custome" onClick={() => setIsOpen(!isOpen)}>
          <IconChevronToggle isOpen={isOpen} />
        </div>
      </div>
      <div className={clsx({
        "transition-all  duration-100 ease  text-body-medium text-gray": true,
        " opacity-100 max-h-[10rem]": isOpen,
        " opacity-0 max-h-0": !isOpen
      })}>
        {value}
      </div>
    </div>
  )
}

export default Accordion
`;
export default CardIntroAccordion