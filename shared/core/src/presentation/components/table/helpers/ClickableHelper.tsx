import React from 'react'

interface ClickableEntryProps {
   onClick?: (entryId?: any) => void
   withLinkComponent?: (props: any) => React.ReactNode
   className?: any
   entryLabel: string
   entryId?: string
}

export const ClickableEntry: React.FC<ClickableEntryProps> = props => {
   const Link = props.withLinkComponent

   return Link ? (
      <Link className={props.className}>{props.entryLabel}</Link>
   ) : (
      <div className={props.className} onClick={() => props.onClick?.(props.entryId)}>
         {props.entryLabel}
      </div>
   )
}
