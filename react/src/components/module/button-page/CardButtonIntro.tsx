
import CardIntroComponent from "@components/cards/CardIntroComponent";
import Button from "@components/ui/Button";

const CardButtonIntro = () => {
  const listExample = [
    {
      title: "Color Variants",
      component: <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-2">
          <Button variant={"solid-primary"} label={'Siska'} />
          <Button variant={"solid-warning"} label={'Siska'} />
          <Button variant={"solid-error"} label={'Siska'} />
          <Button variant={"solid-success"} label={'Siska'} />
          <Button variant={"solid-black"} label={'Siska'} />
          <Button variant={"solid-white"} label={'Siska'} />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"soft-primary"} label={'Siska'} />
          <Button variant={"soft-warning"} label={'Siska'} />
          <Button variant={"soft-error"} label={'Siska'} />
          <Button variant={"soft-success"} label={'Siska'} />
          <Button variant={"soft-black"} label={'Siska'} />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"outline-primary"} label={'Siska'} />
          <Button variant={"outline-warning"} label={'Siska'} />
          <Button variant={"outline-error"} label={'Siska'} />
          <Button variant={"outline-success"} label={'Siska'} />
          <Button variant={"outline-black"} label={'Siska'} />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"link-primary"} label={'Siska'} />
          <Button variant={"link-warning"} label={'Siska'} />
          <Button variant={"link-error"} label={'Siska'} />
          <Button variant={"link-success"} label={'Siska'} />
          <Button variant={"link-black"} label={'Siska'} />
        </div>
      </div>
    },
    {
      title: "Size",
      component: <div className="flex gap-4">
        <Button variant={"solid-primary"} label={'Small'} size={"small"} />
        <Button variant={"solid-primary"} label={'Base'} size={"base"} />
        <Button variant={"solid-primary"} label={'Medium'} size={"medium"} />
        <Button variant={"solid-primary"} label={'Large'} size={"large"} />
      </div>
    },
    {
      title: "Shape",
      component: <div className="flex gap-4">
        <Button variant={"solid-primary"} label={'Rounded'} shape={"rounded"} />
        <Button variant={"solid-primary"} label={'Circle'} shape={"circle"} />
      </div>
    },
    {
      title: "State",
      component: <div className="flex items-center gap-4">
        <Button variant={"solid-primary"} label={'Loading'} isLoading />
        <Button variant={"solid-primary"} label={'Disabled'} disabled />
      </div>
    }
  ]
  return (
    <CardIntroComponent
      title={'Button'}
      subTitle={`"The Button component is a foundational UI element essential for facilitating user interactions in web applications. It serves a dual purpose, capable of functioning either as a traditional button (<button> element) or as a styled link within the application's interface. The primary role of the Button component is to enable users to trigger actions, submit forms, or navigate through different parts of the application.`}
      listExample={listExample}
      displayCodeBase={displayCodeBase}
    />
  );
}

const displayCodeBase = `import IconLoading from '@assets/icons/IconLoading';
import { variantButton } from '@lib/utils/data/variant-color';
import { cn } from '@lib/utils/helper';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLProps } from 'react';
import { Link } from 'react-router-dom';


interface TPropsLink {
  customeElement: "link"
  to: string;
  target?: '_blank' | ''
}

interface TPropsButton {
  customeElement?: "button"
}

type TProps = Omit<Partial<HTMLProps<HTMLButtonElement | HTMLLinkElement>>, "label" | "size" | "shape">
  & VariantProps<typeof buttonVariants>
  & {
    isLoading?: boolean;
    label: React.ReactNode | string;
  }
  & (TPropsLink | TPropsButton);


const Button = (props: TProps) => {
  const { variant, size, customeElement = "button", shape, className, isLoading = false, label, ...attrs } = props

  const CompButton = customeElement === "link" ? Link : "button" as React.ElementType

  let updateVariant: TProps["variant"] = variant || "solid-primary"
  if (customeElement === "link" && !variant) {
    updateVariant = "link-primary"
  }



  return (
    <CompButton
      {...attrs}
      disabled={isLoading || attrs?.disabled}
      className={cn(buttonVariants({ className, variant: updateVariant, size, shape, }))}
      // target={target}
    >
      {
        isLoading ? <span>
          <IconLoading />Loading...
        </span> : label
      }
    </CompButton>

  )
}



const buttonVariants = cva(
  'w-fit  gap-1 h-fit items-center  text-white justify-center font-medium flex gap-sm disabled:cursor-not-allowed  disabled:opacity-50 ',
  {
    variants: {
      variant: {
        ...variantButton,
      },
      shape: {
        "rounded": "rounded-lg",
        "circle": "rounded-full"
      },
      size: {
        "small": "py-1 px-4 ",
        "base": "py-2 px-4 ",
        "medium": "py-3 px-4 text-[16px]",
        "large": "py-4 px-5 text-[18px]",
      },
    },
    defaultVariants: {
      variant: "solid-primary",
      size: "base",
      shape: "rounded"
    },
  },
)

export default Button`;

export default CardButtonIntro;
